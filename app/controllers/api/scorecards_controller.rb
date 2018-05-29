class Api::ScorecardsController < ApplicationController
  before_action :set_scorecard, only: [:show, :update, :destroy]
  before_action :set_game, only: [:index, :update]

  def index # game_scorecards
    game_id = @game.id
    render json: Scorecard.game_scorecards(game_id)
  end

  def home_scorecards
    game_id = @game.id
    render json: Scorecard.home_scorecards(game_id)
  end

  def away_scorecards
    game_id = @game.id
    render json: Scorecard.away_scorecards(game_id)
  end

  def create
    scorecard = current_user.scorecards.new(scorecard_params)
    if scorecard.save
      render json: scorecard
    else
      render json: { errors: scorecard.errors.full_messages.join(',') }, status: 422
    end
  end

  def show
    render json: @scorecard
  end

  def update
    if @scorecard.update(scorecard_params)
      render json: @scorecard
    else
      render json: { errors: scorecard.errors.full_messages.join(',') }, status: 422
    end
  end

  def destroy
    @scorecard.destroy
  end

  def scorecards_by_game_id
    game_id = @scorecard.game_id
    render json: Scorecard.scorecards_by_game_id(game_id)
  end

  def coach_view
    render json: User.where("coach_id = '#{current_user.id}'") #{/* render json: scorecard.SQL() */}
  end

  def my_scorecards
    render json: Scorecard.where("user_id='#{current_user.id}'")
  end

  private

  def scorecard_params
    params.require(:scorecard).permit(:one_pointer, :two_pointer, :three_pointer, :fouls, :assists, :rebounds, :steals, :active, :game_id, :user_id, :jersey_num)
  end

  def set_scorecard
    @scorecard = Scorecard.find(params[:id])
  end

  def set_game 
    @game = Game.find(params[:game_id])
  end

end