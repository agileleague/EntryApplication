class BenthicCover < ActiveRecord::Base

  has_many :point_intercepts, :dependent => :destroy
  has_many :cover_cats, :through => :point_intercepts
  accepts_nested_attributes_for :point_intercepts, :allow_destroy => true

  belongs_to :diver
  belongs_to :habitat_type
  belongs_to :boatlog_manager

  has_one    :invert_belt, :dependent => :destroy
  accepts_nested_attributes_for     :invert_belt, :allow_destroy => true
  has_one     :presence_belt, :dependent => :destroy
  accepts_nested_attributes_for     :presence_belt, :allow_destroy => true
  has_one     :rugosity_measure, :dependent => :destroy
  accepts_nested_attributes_for     :rugosity_measure, :allow_destroy => true

  def myId
    return self.diver_id
  end

  validates :boatlog_manager_id,    :presence => true
  validates :diver_id,              :presence => true
  validates :buddy,                 :presence => true
  validates :sample_date,           :presence => true
  validates :sample_begin_time,     :presence => true
  validates :field_id,              :presence => true, :length => { :minimun => 6, :maximum => 6 }
  validates_format_of :field_id,    :with => /\d{5}[a-zA-Z]/
  validates :habitat_type,          :presence => true
  validates :meters_completed,      :presence => true
  validates :sample_description,    :length => { :maximum => 150 } 


  def msn
    return [ "X", self.sample_date.strftime('%Y%m%d'), self.sample_begin_time.strftime('%H%M'), self.diver.diver_number ].join('')
  end

  def field_id=(value)
    write_attribute(:field_id, value.upcase)
  end

end
