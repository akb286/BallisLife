class Api::GamesController < ApplicationController
  before_action :set_game, only: [:show, :update, :destroy]
  
  def index
    render json: Game.all
  end

  def create
    game = Game.create(game_params)
    if game.save
      render json: game
    else
      render json: { errors: game.errors.full_messages.join(',') }, status: 422
    end
  end

  def show
    render json: @game
  end

  def update
    if @game.update(game_params)
      render json: @game
    else
      render json: { errors: game.errors.full_messages.join(',') }, status: 422
    end
  end

  def destroy
    @game.destroy
  end

  private

    def game_params
      params.require(:game).permit(:time_clock, :coach_home, :coach_away, :date)
    end

    def set_game
      @game = Game.find(params[:id])
    end
end