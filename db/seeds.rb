10.times do
  event = Event.create(
    title: Faker::Beer.name,
    startDate: Faker::Time.between(1.days.ago, Date.today),
    endDate: Faker::Time.between(0.days.ago, Date.today),
    location: Faker::Lorem.word,
    allday: Faker::Boolean.boolean(0.3)
)
end

20.times do
  Post.create(
    name: Faker::DragonBall.character,
    subject: Faker::LordOfTheRings.location,
    description: Faker::StarWars.quote,
    user_id: rand(1..6)
  )
end
puts "seeded"
