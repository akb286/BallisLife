class CreateScorecards < ActiveRecord::Migration[5.1]
  def change
    create_table :scorecards do |t|
      t.integer :one_pointer
      t.integer :two_pointer
      t.integer :three_pointer
      t.integer :fouls
      t.integer :assists
      t.integer :rebounds
      t.integer :steals
      t.boolean :active
      t.string :jersey_num
      t.belongs_to :user, foreign_key: true
      t.belongs_to :game, foreign_key: true

      t.timestamps
    end
  end
end
