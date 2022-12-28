class CreateConnections < ActiveRecord::Migration[7.0]
  def change
    create_table :connections do |t|
      t.references :card, null: false, foreign_key: true
      t.references :word, null: false, foreign_key: true
      t.timestamps
    end
    add_index :connections, [:card_id, :word_id], unique: true
  end
end
