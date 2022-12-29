# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_12_29_031504) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cards", force: :cascade do |t|
    t.string "title", null: false
    t.text "text"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_cards_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "word_id", null: false
    t.text "text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "word_id"], name: "index_comments_on_user_id_and_word_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
    t.index ["word_id"], name: "index_comments_on_word_id"
  end

  create_table "connections", force: :cascade do |t|
    t.bigint "card_id", null: false
    t.bigint "word_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["card_id", "word_id"], name: "index_connections_on_card_id_and_word_id", unique: true
    t.index ["card_id"], name: "index_connections_on_card_id"
    t.index ["word_id"], name: "index_connections_on_word_id"
  end

  create_table "favorites", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "word_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "word_id"], name: "index_favorites_on_user_id_and_word_id", unique: true
    t.index ["user_id"], name: "index_favorites_on_user_id"
    t.index ["word_id"], name: "index_favorites_on_word_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "remember_digest"
    t.string "activation_digest"
    t.boolean "activated"
    t.datetime "activated_at"
    t.string "reset_digest"
    t.datetime "reset_sent_at"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "words", force: :cascade do |t|
    t.string "title", null: false
    t.string "kana", null: false
    t.text "meaning", null: false
    t.text "text"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_words_on_user_id"
  end

  add_foreign_key "cards", "users"
  add_foreign_key "comments", "users"
  add_foreign_key "comments", "words"
  add_foreign_key "connections", "cards"
  add_foreign_key "connections", "words"
  add_foreign_key "favorites", "users"
  add_foreign_key "favorites", "words"
  add_foreign_key "words", "users"
end
