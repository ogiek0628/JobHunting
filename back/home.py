from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import logging
logging.basicConfig(level=logging.DEBUG)



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Company.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), nullable=False)


# 登録ボタンを押された時の動き（リストに追加）
@app.route('/add', methods=['POST'])
def add_entry():
    text_data = request.json['text']
    new_entry = Company(text=text_data)
    db.session.add(new_entry)
    db.session.commit()
    return jsonify({"message": "Entry added", "text": text_data})


# ページが開かれた時の動き（リスト取得）
@app.route('/', methods=['GET'])
def get_entries():
    entries = Company.query.all()
    return jsonify([{'id': entry.id, 'text': entry.text} for entry in entries])


# 削除ボタンが押された時の動き（リストから削除）
@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_entry(id):
    entry = Company.query.get(id)
    if not entry:
        return jsonify({'error': 'Entry not found'}), 404
    db.session.delete(entry)
    db.session.commit()
    return jsonify({'message': 'Entry deleted'}), 200



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=7000)