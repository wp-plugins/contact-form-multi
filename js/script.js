(function($) {
	$(document).ready( function() {	
		/* Add new variables */
		var cntctfrmmlt_name = new Array(),
			cntctfrmmlt_size,
			cntctfrmmlt_idd,
			cntctfrmmlt_room = new Array();
		
		$( '.wrap' ).children( '#cntctfrm_settings_form' ).wrap( '<div class="cntctfrmmlt-nav"></div>' );
		$( '.wrap' ).children( '#cntctfrmpr_settings_form' ).wrap( '<div class="cntctfrmmlt-nav"></div>' );
		$( '.cntctfrmmlt-nav' ).wrap( '<div class="cntctfrmmlt-tab-wrapper nav-tab-wrapper"></div>' );
		$( '.cntctfrmmlt-tab-wrapper' ).prepend( '<input class="cntctfrmmlt-enter" type="button" value="&#043" />' );
		$( '.cntctfrmmlt-tab-wrapper' ).after( '<div class="clear"></div>' );
		for ( var i in cntctfrmmlt_count ) {
			$( '.cntctfrmmlt-enter' ).before( '<li id="' + i + '" class="cntctfrmmlt-nav-tab nav-tab"><input id="'+i+'" class="cntctfrmmlt-text" style="display:none" size="10" type="text" value="'+cntctfrmmlt_count[i]+'" /><div class="cntctfrmmlt-noactive"></div><input type="button" name="cntctfrmmlt_del" class="cntctfrmmlt-delete" value=" " /></li>' );
			cntctfrmmlt_room.push( i );			
		}

		/* Update name of the form */
		$( 'input[class="cntctfrmmlt-text"]' ).blur( function() {
			for ( var i = 0; i <= cntctfrmmlt_room.length; i++ ) {
				if ( i in cntctfrmmlt_room ) {
					cntctfrmmlt_name.push( cntctfrmmlt_room[i] + ":" +$( 'input[id='+cntctfrmmlt_room[i]+']' ).val() );
				}
			}
			var data = {
				action: 'cntctfrmmlt_action',
				cntctfrmmlt_name_form: cntctfrmmlt_name
			};
			jQuery.post( ajaxurl, data, function( response ) {
				document.location.href=cntctfrmmlt_location +"&id="+cntctfrmmlt_id_form;
			});
		});

		/* Add new form */
        $( '.cntctfrmmlt-enter' ).click( function() {
			for ( var i = 0; i < cntctfrmmlt_room.length; i++ ) {
				if ( i in cntctfrmmlt_room ) {
					cntctfrmmlt_name.push( cntctfrmmlt_room[i]+ ":" +$( 'input[id='+cntctfrmmlt_room[i]+']' ).val() );
				}
			}
			cntctfrmmlt_name.push( cntctfrmmlt_key_id+ ':NEW_FORM' );
			cntctfrmmlt_idd = cntctfrmmlt_key_id;
			var data = {
				action: 'cntctfrmmlt_action',
				cntctfrmmlt_name_form: cntctfrmmlt_name,
				cntctfrmmlt_key_form: cntctfrmmlt_idd
			};
			jQuery.post( ajaxurl, data, function( response ) {
				document.location.href=cntctfrmmlt_location;
			});
		});
		$( 'input[class="cntctfrmmlt-delete"]' ).click( function() {
			if ( confirm( cntctfrmmlt_delete_message ) ) {
				document.location.href=cntctfrmmlt_location + "&del=" + $( this ).attr( 'name' ) +"&id=" + $( this ).parent( 'li' ).attr( 'id' );	
			}
		});

		/* Determination of active <li>*/
		$( '.cntctfrmmlt-noactive' ).click( function() {
			if ( ! $( this ).parent( 'li' ).hasClass( 'cntctfrmmlt-activee' ) )
				document.location.href=cntctfrmmlt_location +"&id="+ $( this ).parent( 'li' ).attr( 'id' );
		});
		
		/*Add style for active <li>(Добавление стиля для активной <li>)*/
		$( '.cntctfrmmlt-nav-tab' ).each( function() {
			if ( $( this ).attr( 'id' ) == cntctfrmmlt_id_form ) {
				$( this ).addClass( 'cntctfrmmlt-activee nav-tab-active' ).removeClass( 'cntctfrmmlt-nav-tab' );
			}
		});

		/* remove Disabled */
		if ( $( 'li' ).hasClass( 'cntctfrmmlt-activee' ) ) {
			$( '.cntctfrmmlt-activee' ).children( 'input[class="cntctfrmmlt-text"]' ).css( "display", "inline-block" );
			$( '.cntctfrmmlt-activee' ).children( '.cntctfrmmlt-noactive' ).css({ "display":"none","float":"none" });
		}
		$( '.cntctfrmmlt-nav-tab' ).each( function() {
			if ( $( 'li' ).hasClass( 'cntctfrmmlt-nav-tab' ) ) {
				$( this ).children( '.cntctfrmmlt-noactive' ).text( $( this ).children( 'input[class="cntctfrmmlt-text"]' ).val() );
			}
		});
	});
})(jQuery);