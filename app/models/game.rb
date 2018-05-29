class Game < ApplicationRecord
  has_many :scorecards
  has_many :users, through: :scorecards
end
