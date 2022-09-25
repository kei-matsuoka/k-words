class AddKanaToWords < ActiveRecord::Migration[7.0]
  def change
    add_column :words, :kana, :string
  end
end
