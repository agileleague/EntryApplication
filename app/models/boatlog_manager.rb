class BoatlogManager < ActiveRecord::Base
  has_many  :samples
  has_one   :diver

  def agency_name
    [self.agency, self.lastname].join('/')
  end

  validates :agency,        :presence => true
  validates :firstname,     :presence => true
  validates :lastname,      :presence => true


end
