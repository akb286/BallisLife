class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :startDate
      t.datetime :endDate

      t.timestamps
    end
  end
end
