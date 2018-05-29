class User < ActiveRecord::Base
  has_many :posts
  has_many :scorecards
  has_many :games, through: :scorecards
  has_many :players, :class_name => 'User', :foreign_key => :coach_id
  has_many :coaches, :class_name => 'User', :foreign_key => :league_manager_id
  belongs_to :league_manager, :class_name => 'User', optional: :true
  belongs_to :coach, :class_name => 'User', optional: :true

  def coach?
    coach_id.nil?
  end

  def player?
    !coach?
  end

  def self.coach_list
    User.find_by_sql("
      SELECT *, name AS text, id AS value
      FROM Users
      WHERE role='coach'
      ")
  end

  def self.my_players(current_user)
    User.find_by_sql("
      SELECT *
      FROM Users
      WHERE coach_id=#{current_user.id}
      ")
  end

  def self.coach_players(current_user)
    User.find_by_sql("
      SELECT *, name AS text, id AS value
      FROM users
      WHERE coach_id=#{current_user.id}
      ")
  end

  def self.player_list
    User.find_by_sql("
      SELECT *
      FROM Users
      WHERE role='player'
      ")
  end

  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable
  include DeviseTokenAuth::Concerns::User
end
