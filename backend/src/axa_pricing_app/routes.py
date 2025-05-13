import os

from flask import Blueprint, request, jsonify, send_file, current_app
from datetime import datetime
from docx import Document
from weasyprint import HTML

from axa_pricing_app import db
from axa_pricing_app.models import Quote

bp = Blueprint('quotes', __name__)


@bp.route('/quotes', methods=['GET'])
def get_quotes():
    filters = {}
    if 'client_name' in request.args:
        filters['client_name'] = request.args['client_name']
    if 'opportunity_number' in request.args:
        filters['opportunity_number'] = request.args['opportunity_number']

    query = Quote.query
    for key, value in filters.items():
        query = query.filter(getattr(Quote, key).like(f"%{value}%"))

    quotes = query.all()
    return jsonify([q.serialize() for q in quotes])

@bp.route('/quotes', methods=['POST'])
def create_quote():
    data = request.json
    quote = Quote(
        opportunity_number=data['opportunity_number'],
        client_name=data['client_name']
    )
    db.session.add(quote)
    db.session.commit()

    timestamp = datetime.now().strftime('%Y-%m-%d_%H-%M')
    filename_base = f"Proposition_commerciale_{quote.opportunity_number}_{timestamp}"
    docx_path = os.path.join(current_app.config['UPLOAD_FOLDER'], f"{filename_base}.docx")
    pdf_path = os.path.join(current_app.config['UPLOAD_FOLDER'], f"{filename_base}.pdf")

    doc = Document()
    doc.add_heading("Proposition Commerciale", 0)
    doc.add_paragraph(f"Client : {quote.client_name}")
    doc.add_paragraph(f"Opportunité : {quote.opportunity_number}")
    doc.add_paragraph(f"Date : {datetime.now().strftime('%d/%m/%Y %H:%M')}")
    doc.save(docx_path)

    html_content = f"""
    <h1>Proposition Commerciale</h1>
    <p>Client : {quote.client_name}</p>
    <p>Opportunité : {quote.opportunity_number}</p>
    <p>Date : {datetime.now().strftime('%d/%m/%Y %H:%M')}</p>
    """
    HTML(string=html_content).write_pdf(pdf_path)

    return jsonify({
        "message": "Quote created",
        "id": quote.id,
        "docx_url": f"/quotes/{quote.id}/document?type=docx",
        "pdf_url": f"/quotes/{quote.id}/document?type=pdf"
    })

@bp.route('/quotes/<int:quote_id>/document')
def download_document(quote_id):
    doc_type = request.args.get('type', 'pdf')
    quote = Quote.query.get_or_404(quote_id)
    timestamp = quote.created_at.strftime('%Y-%m-%d_%H-%M')
    filename = f"Proposition_commerciale_{quote.opportunity_number}_{timestamp}.{doc_type}"
    file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)

    if not os.path.exists(file_path):
        return jsonify({"error": "Document not found"}), 404

    return send_file(file_path, as_attachment=True)
