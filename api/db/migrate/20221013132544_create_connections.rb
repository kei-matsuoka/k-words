class CreateConnections < ActiveRecord::Migration[7.0]
  def change
    create_table :connections do |t|
      t.references :card, index: true, foreign_key: true
      t.references :word, index: true, foreign_key: true
      t.timestamps
    end
    add_index :connections, [:card_id, :word_id], unique: true
  end
end
