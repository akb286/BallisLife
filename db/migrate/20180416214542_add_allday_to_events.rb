class AddAlldayToEvents < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :allday, :boolean
  end
end
