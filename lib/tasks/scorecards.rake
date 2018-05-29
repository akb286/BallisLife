require 'csv'

namespace :scorecards do
  desc "Seeding Scorecards"
  task database: :environment do
    csv_text = File.read(Rails.root.join('lib', 'seeds', 'scorecards.csv'))
    csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
    csv.each do |row|
      
      s = Scorecard.new
      s.one_pointer = row['one_pointer']
      s.two_pointer = row['two_pointer']
      s.three_pointer = row['three_pointer']
      s.fouls = row['fouls']
      s.assists = row['assists']
      s.rebounds = row['rebounds']
      s.steals = row['steals']
      s.active = row['active']
      s.jersey_num = row['jersey_num']
      s.user_id = row['user_id']
      s.game_id = row['game_id']
      s.save

    end
  end

end
