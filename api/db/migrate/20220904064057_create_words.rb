class CreateWords < ActiveRecord::Migration[7.0]
  def change
    create_table :words do |t|
      t.string :title, null: false
      t.string :kana, null: false
      t.text :meaning, null: false
      t.text :text
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
