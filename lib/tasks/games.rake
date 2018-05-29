require 'csv'

namespace :games do
  desc "Seeding Games"
  task database: :environment do
    csv_text = File.read(Rails.root.join('lib', 'seeds', 'games.csv'))
    csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
    csv.each do |row|
      g = Game.new
      g.time_clock = row['time_clock']
      g.coach_home = row['coach_home']
      g.coach_away = row['coach_away']
      g.fouls_home = row['fouls_home']
      g.fouls_away = row['fouls_away']
      g.date = row['data']
      g.save
    end
  end 

end
