class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.float :time_clock
      t.integer :coach_home
      t.integer :coach_away
      t.integer :fouls_home
      t.integer :fouls_away
      t.date :date
      # TODO - do we need to add back in "total_fouls", "available_timeouts"

      t.timestamps
    end
  end
end