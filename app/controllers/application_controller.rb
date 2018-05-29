class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  private

  def set_time_zone
    Time.zone = current_user.time_zone
  end

end
