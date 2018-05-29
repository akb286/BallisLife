Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :users
    resources :games do
      resources :scorecards
    end
    resources :posts
    resources :events
    get "events", to: "events#index"
    get "coach_view", to: "scorecards#coach_view"
    get "my_scorecards", to: "scorecards#my_scorecards"
    get "coach_list", to: "users#coach_list"
    get "player_list", to: "users#player_list"
    get "my_players", to: "users#my_players"
    get "coach_players", to: "users#coach_players"
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
