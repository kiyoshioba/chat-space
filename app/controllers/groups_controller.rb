class GroupsController < ApplicationController
  def new
  end

  def create
  end

  def edit
  end

  def update
    if current_group.update(group_params)
      redirect_to root_path
    else
      render :edit
    end
  end

end
