require 'csv'

namespace :populate do
  desc "Seeding Users"
  task database: :environment do
    csv_text = File.read(Rails.root.join('lib', 'seeds', 'users.csv'))
    csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
    csv.each do |row|
      u = User.new
      u.password = row['password']
      u.name = row['name']
      u.nickname = row['nickname']
      u.image = row['image']
      u.email = row['email']
      u.coach_id = row['coach_id']
      u.league_manager_id = row['league_manager_id']
      u.role = row['role']
      u.save
    end
  end

end
