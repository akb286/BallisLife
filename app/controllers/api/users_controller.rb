class Api::UsersController < ApplicationController
# NOTE TODO: everything that is commented out 'should' work, but we aren't using it yet so I left it commented out to keep from confusion
  before_action :set_user, only: [:show, :update, :destroy]
  
  # def index
  #   render json: User.all
  # end

  # def create
  #   user = User.create(user_params)
  #   if user.save
  #     render json: user
  #   else
  #     render json: { errors: user.errors.full_messages.join(',') }, status: 422
  #   end
  # end

  def show
    render json: @user
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: { errors: user.errors.full_messages.join(',') }, status: 422
    end
  end

  # def destroy
  #   @user.destroy
  # end

  def coach_list
    render json: User.coach_list
  end

  def my_players
    render json: User.my_players(current_user)
  end

  def coach_players
    render json: User.coach_players(current_user)
  end

  def player_list
    render json: User.player_list
  end

  private
  #   # I think these are all of the params, but someone might want to double check that.
    def user_params
      params.require(:user).permit(:id, :name, :nickname, :image, :email, :coach_id, :league_manager_id, :role)
    end

    def set_user
      @user = User.find(params[:id])
    end
end

