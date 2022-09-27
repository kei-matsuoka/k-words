class CreateWords < ActiveRecord::Migration[7.0]
  def change
    create_table :words do |t|
      t.string :question
      t.string :answer
      t.text :text
      t.references :card, null: false, foreign_key: true

      t.timestamps
    end
  end
end
