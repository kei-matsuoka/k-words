class ChangeColumnToCards < ActiveRecord::Migration[7.0]
  def change
    remove_index :cards, [:created_at]
  end
end
