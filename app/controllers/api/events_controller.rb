class Api::EventsController < ApplicationController
  before_action :set_event, only: [:show, :update, :destroy]
  def index
    render json: Event.custom
  end

  def create
    event = Event.create(event_params)
    if event.save
      render json: event
    else
      render json: { errors: event.errors.full_messages.join(',') }, status: 422
    end
  end

  def show
    render json: @event
  end

  def update
    if @event.update(event_params)
      render json: @event
    else
      render json: { errors: event.errors.full_messages.join(',') }, status: 422
    end
  end

  def destroy
    @event.destroy
  end

  private

  def event_params
    params.require(:event).permit(:title, :startDate, :endDate, :location, :allday)
  end

  def set_event
    @event = Event.find(params[:id])
  end
end

