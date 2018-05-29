class Event < ApplicationRecord

  def self.custom
    results = Event.find_by_sql("
      SELECT * FROM events")
      formatted_results = []
      results.each do |t|
      formatted_results << { 
        id: t.id,
        title: t.title,
        startDate: t.startDate.strftime("%m/%e/%Y %l:%M %p"),
        endDate: t.endDate.strftime("%m/%e/%Y %l:%M %p"),
        location: t.location,
        allday: t.allday }
      end
      formatted_results
  end
end