// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery_nested_form
//= require rails.validations
//= require_tree .
//

$(function(){
   
    $("#substrateSection").hide();
    $("#speciesSection").hide();
    $(".changeSection").change(function() {
      // hide
      $("div.sectionDiv").hide();
      // val is something like #div1 or #div2
      var targetId = $(this).val();
      // show the new selected one
      $("#"+targetId).show();
  });
   
    $(".changeSection option[value='substrateSection']").attr("disabled", "disabled");
    $(".changeSection option[value='speciesSection']").attr("disabled", "disabled");
 
    function show_or_hide_section(){

      var should_display_substrate = new Array();
      var should_display_species = new Array();

      $('#sampleSection').find('.tab_1').each(function(){
        // This equality test does NOT work with '0' because they time
        // option_selects can be '0'
        if ( $(this).val() == '' )
          {
            should_display_substrate.push( $(this) );
          };
      });

      if ( should_display_substrate.length == 0 )
        { 
          $(".changeSection option[value='substrateSection']").removeAttr("disabled");
        };

      $('#substrateSection').find('.tab_2').each(function(){
        // This equality test does NOT work with '0' because they time
        // option_selects can be '0'
        if ( $(this).val() == '' )
          {
            should_display_species.push( $(this) );
          };
      });

      if ( should_display_species.length == 0 )
        { 
          $(".changeSection option[value='speciesSection']").removeAttr("disabled");
        };


    };
 
  
  function set_option_select(){
    var radioVal = $('input:radio[name=displayType]:checked').val();
    if ( radioVal == "0"){
      var $codeVal = $(this).val();
      console.log($codeVal);
    };  
  };
  
  function show_code(){
      $(".section_3 .common").attr('disabled', 'true');
      $(".section_3 .common").hide();
      $(".section_3 .code").removeAttr('disabled');
      $(".section_3 .code").show();
  };

  function show_common(){
      $(".section_3 .code").attr('disabled', 'true');
      $(".section_3 .code").hide();
      $(".section_3 .common").removeAttr('disabled');
      $(".section_3 .common").show();
  };
  
  function display_code_or_common(){
    var radioVal = $('input:radio[name=displayType]:checked').val();
    if ( radioVal == '0' ){
      show_code();
    };
    if ( radioVal == '1'){
      show_common();
    };
  };

  function change_code_or_common(){
    var radioVal = $('input:radio[name=displayType]:checked').val();
    if ( radioVal == '0'){
      $('select.common').each(function(index){
        var $commonVal = $('select.common').slice(index).val();
        $('select.code option[value="' + $commonVal + '"]').slice(index).attr('selected', 'selected');
      });
      show_code();
    }; 
    if ( radioVal == '1'){
      $('select.code').each(function(index){
        var $codeVal = $('select.code').slice(index).val();
        $('select.common option[value="' + $codeVal + '"]').slice(index).attr('selected', 'selected');
      });
      show_common();
    };
  };

  function set_time_seen_field_on_focus(){
      $('select').on('focus', function(){
        var $thisID = $(this).attr('id').slice(0, -10);
        var $radioTimeSeenVal = $('input:radio[name=timeSeen]:checked').val();

        $('input#' + $thisID + '_time_seen').attr('value', $radioTimeSeenVal );
        $('input#' + $thisID + '_number_individuals').attr('class', 'timeSeen_' + $radioTimeSeenVal);
        $('input#' + $thisID + '_average_length').attr('class', 'timeSeen_' + $radioTimeSeenVal);
        $('input#' + $thisID + '_min_length').attr('class', 'timeSeen_' + $radioTimeSeenVal);
        $('input#' + $thisID + '_max_length').attr('class', 'timeSeen_' + $radioTimeSeenVal);
      });  
  };

    set_time_seen_field_on_focus();

   // On radio button change display code or common name
     
     $('.radio_button').on("change", function(){ 
        change_code_or_common();
    });
     
     $(document).delegate(".add_nested_fields", "click", function(){ 
        display_code_or_common();
        set_time_seen_field_on_focus();
        $('select.code option[value=""]').slice(-2).attr('selected', 'selected');
        $('select.common option[value=""]').slice(-2).attr('selected', 'selected');
   });


  function calculate_totals( input_class_to_sum, id_to_display_total){
  
        var sum_for_display_total = new Array();
  
        $('.section_2').find('.' + input_class_to_sum).each(function(){
          if ( $(this).val() != 0 )
            {
              sum_for_display_total.push( $(this).val() );
            };
        });
  
        var total = 0;
  
        $.each(sum_for_display_total,function() {
            total += parseFloat( this );
        });
  
      // If total is greater than 100 then flag it by add a red background.
        if ( total != 100 )
          {
            $( '#' + id_to_display_total).removeClass('one_hundred_ok_flag');
            $( '#' + id_to_display_total).addClass('one_hundred_flag');
          }
        else
          {
            $( '#' + id_to_display_total).addClass('one_hundred_ok_flag');
            $( '#' + id_to_display_total).removeClass('one_hundred_flag');
          }
  
        $( '#' + id_to_display_total).val( total ); 
      };    


   // Show or hide sections
 //   show_or_hide_section();

   // on change check if section should show
     $('.tab_1').change(function(){ 
        show_or_hide_section();
    });
     
     $('.tab_2').change(function(){ 
        show_or_hide_section();
    });

   // Calculate total for 'surface_hard' when page loads
    calculate_totals( 'hard_relief', 'hard_relief_total' );

    // Calculate total for 'surface_hard' on change
    $('.hard_relief').change(function(){
        calculate_totals( 'hard_relief', 'hard_relief_total' );
    });

    // Calculate total for 'surface_soft' when page loads
    calculate_totals('soft_relief', 'soft_relief_total' );

    // Calculate total for 'surface_soft' on change
    $('.soft_relief').change(function(){
        calculate_totals( 'soft_relief', 'soft_relief_total' );
    });
    
    // Calculate total for 'abiotic_footprint' when page loads
    calculate_totals('abiotic_percentage', 'abiotic_percentage_total' );

    // Calculate total for 'abiotic_footprint' on change
    $('.abiotic_percentage').change(function(){
        calculate_totals( 'abiotic_percentage', 'abiotic_percentage_total' );
    });

    // Calculate total for 'biotic_percentage_sand' when page loads
    calculate_totals('biotic_percentage_sand', 'biotic_percentage_sand_total' );

    // Calculate total for 'biotic_percentage_sand' on change
    $('.biotic_percentage_sand').change(function(){
        calculate_totals( 'biotic_percentage_sand', 'biotic_percentage_sand_total' );
    });

    // Calculate total for 'biotic_percentage_hardbottom' when page loads
    calculate_totals('biotic_percentage_hardbottom', 'biotic_percentage_hardbottom_total' );

    // Calculate total for 'biotic_percentage_hardbottom' on change
    $('.biotic_percentage_hardbottom').change(function(){
        calculate_totals( 'biotic_percentage_hardbottom', 'biotic_percentage_hardbottom_total' );
    });

});

