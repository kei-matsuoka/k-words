class CreateContacts < ActiveRecord::Migration[7.0]
  def change
    create_table :contacts do |t|
      t.string :email
      t.string :category, null: false
      t.text :text, null: false
      t.timestamps
    end
  end
end
