class Scorecard < ApplicationRecord
  belongs_to :user
  belongs_to :game

  def self.game_scorecards(game_id)
    Scorecard.find_by_sql("
    SELECT *
    FROM scorecards
    LEFT JOIN
        users ON users.id = scorecards.user_id
    WHERE game_id=#{game_id}
    ")
  end
end