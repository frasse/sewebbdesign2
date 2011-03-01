class Notice < ActiveRecord::Base
	belongs_to :user
	cattr_reader :per_page
	@@per_page = 3
	validates_length_of :title, :minimum => 1
	validates_length_of :text, :minimum => 1
end
