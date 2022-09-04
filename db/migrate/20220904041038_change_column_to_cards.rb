class ChangeColumnToCards < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :cards, :users
    remove_reference :cards, :user
    remove_index :cards, [:created_at]
  end
end
