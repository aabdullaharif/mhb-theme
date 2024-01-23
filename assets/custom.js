/** Shopify CDN: Minification failed

Line 167:7 Transforming let to the configured target environment ("es5") is not supported yet
Line 168:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 209:6 Transforming const to the configured target environment ("es5") is not supported yet
Line 217:12 Transforming const to the configured target environment ("es5") is not supported yet
Line 218:12 Transforming let to the configured target environment ("es5") is not supported yet
Line 224:12 Transforming let to the configured target environment ("es5") is not supported yet
Line 225:12 Transforming let to the configured target environment ("es5") is not supported yet
Line 264:10 Transforming let to the configured target environment ("es5") is not supported yet
Line 265:10 Transforming const to the configured target environment ("es5") is not supported yet
Line 273:14 Transforming const to the configured target environment ("es5") is not supported yet
... and 12 more hidden warnings

**/
/**
 * DEVELOPER DOCUMENTATION
 *
 * Include your custom JavaScript here.
 *
 * The theme Focal has been developed to be easily extensible through the usage of a lot of different JavaScript
 * events, as well as the usage of custom elements (https://developers.google.com/web/fundamentals/web-components/customelements)
 * to easily extend the theme and re-use the theme infrastructure for your own code.
 *
 * The technical documentation is summarized here.
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN A VARIANT HAS CHANGED
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever a the user has changed the variant in a selector. The target get you the form
 * that triggered this event.
 *
 * Example:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   let variant = event.detail.variant; // Gives you access to the whole variant details
 *   let form = event.target;
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * MANUALLY CHANGE A VARIANT
 * ------------------------------------------------------------------------------------------------------------
 *
 * You may want to manually change the variant, and let the theme automatically adjust all the selectors. To do
 * that, you can get the DOM element of type "<product-variants>", and call the selectVariant method on it with
 * the variant ID.
 *
 * Example:
 *
 * const productVariantElement = document.querySelector('product-variants');
 * productVariantElement.selectVariant(12345);
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN A NEW VARIANT IS ADDED TO THE CART
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever a variant is added to the cart through a form selector (product page, quick
 * view...). This event DOES NOT include any change done through the cart on an existing variant. For that,
 * please refer to the "cart:updated" event.
 *
 * Example:
 *
 * document.addEventListener('variant:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * BEING NOTIFIED WHEN THE CART CONTENT HAS CHANGED
 * ------------------------------------------------------------------------------------------------------------
 *
 * This event is fired whenever the cart content has changed (if the quantity of a variant has changed, if a variant
 * has been removed, if the note has changed...). This event will also be emitted when a new variant has been
 * added (so you will receive both "variant:added" and "cart:updated"). Contrary to the variant:added event,
 * this event will give you the complete details of the cart.
 *
 * Example:
 *
 * document.addEventListener('cart:updated', function(event) {
 *   var cart = event.detail.cart; // Get the updated content of the cart
 * });
 *
 * ------------------------------------------------------------------------------------------------------------
 * REFRESH THE CART/MINI-CART
 * ------------------------------------------------------------------------------------------------------------
 *
 * If you are adding variants to the cart and would like to instruct the theme to re-render the cart, you cart
 * send the cart:refresh event, as shown below:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 *
 * ------------------------------------------------------------------------------------------------------------
 * USAGE OF CUSTOM ELEMENTS
 * ------------------------------------------------------------------------------------------------------------
 *
 * Our theme makes extensive use of HTML custom elements. Custom elements are an awesome way to extend HTML
 * by creating new elements that carry their own JavaScript for adding new behavior. The theme uses a large
 * number of custom elements, but the two most useful are drawer and popover. Each of those components add
 * a "open" attribute that you can toggle on and off. For instance, let's say you would like to open the cart
 * drawer, whose id is "mini-cart", you simply need to retrieve it and set its "open" attribute to true (or
 * false to close it):
 *
 * document.getElementById('mini-cart').open = true;
 *
 * Thanks to the power of custom elements, the theme will take care automagically of trapping focus, maintaining
 * proper accessibility attributes...
 *
 * If you would like to create your own drawer, you can re-use the <drawer-content> content. Here is a simple
 * example:
 *
 * // Make sure you add "aria-controls", "aria-expanded" and "is" HTML attributes to your button:
 * <button type="button" is="toggle-button" aria-controls="id-of-drawer" aria-expanded="false">Open drawer</button>
 *
 * <drawer-content id="id-of-drawer">
 *   Your content
 * </drawer-content>
 *
 * The nice thing with custom elements is that you do not actually need to instantiate JavaScript yourself: this
 * is done automatically as soon as the element is inserted to the DOM.
 *
 * ------------------------------------------------------------------------------------------------------------
 * THEME DEPENDENCIES
 * ------------------------------------------------------------------------------------------------------------
 *
 * While the theme tries to keep outside dependencies as small as possible, the theme still uses third-party code
 * to power some of its features. Here is the list of all dependencies:
 *
 * "vendor.js":
 *
 * The vendor.js contains required dependencies. This file is loaded in parallel of the theme file.
 *
 * - custom-elements polyfill (used for built-in elements on Safari - v1.0.0): https://github.com/ungap/custom-elements
 * - web-animations-polyfill (used for polyfilling WebAnimations on Safari 12, this polyfill will be removed in 1 year - v2.3.2): https://github.com/web-animations/web-animations-js
 * - instant-page (v5.1.0): https://github.com/instantpage/instant.page
 * - tocca (v2.0.9); https://github.com/GianlucaGuarini/Tocca.js/
 * - seamless-scroll-polyfill (v2.0.0): https://github.com/magic-akari/seamless-scroll-polyfill
 *
 * "flickity.js": v2.2.0 (with the "fade" package). Flickity is only loaded on demand if there is a product image
 * carousel on the page. Otherwise it is not loaded.
 *
 * "photoswipe": v4.1.3. PhotoSwipe is only loaded on demand to power the zoom feature on product page. If the zoom
 * feature is disabled, then this script is never loaded.
 */

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function getFirstAvailableVariantId(product) {
  // Check if product has any variants
  if (!product.variants || product.variants.length === 0) {
    return null; // No variants available
  }
  
  // Loop through the variants
  for (let i = 0; i < product.variants.length; i++) {
    const variant = product.variants[i];
    
    // Check if variant is available
    if (variant.available) {
      return variant.id; // Return the first available variant ID
    }
  }
  
  return null; // No available variants found
}

$( document ).ready(function() {
  var variantsMetafieldsEle = $('#hidden-variant-metafields-container');
  var variantsMetafields = '';
  if(variantsMetafieldsEle.length > 0) {
      var variantsMetafields = jQuery.parseJSON($("#hidden-variant-metafields-container").html());
  }
  var pathname = window.location.pathname;
  var sanitizedPathname = pathname.slice(1);
  var variantId = getUrlVars()['variant'];
  var selectedVariant = null;
  var selects = $('div.product-form product-variants combo-box div.combo-box__option-list');
  var runOnce = false;
  var cartCount = parseInt($('cart-count').text());

  // accordions on make it yours
  jQuery('#accordion li > a').click(function(e) {
    e.preventDefault();
    $('#accordion .accordion').removeClass('focus');
    $(this).next('.accordion').addClass('focus');
  });
  
  jQuery.getJSON(window.Shopify.routes.root + sanitizedPathname +'.js', function(product) {
    if(product.type == 'Fine Jewelry'){
      selects.each(function() {
          var options = $(this).find('button'); // Get all the options within the current select element
          $(options[0]).click();
      });
    }
    console.log(product);
    if(product && variantId) {
      const productVariantElement = document.querySelector('product-variants');
      var variants = product.variants;
      console.log(variants);
      variants.forEach((ele) => {
        if(ele.id === parseInt(variantId)) {
          selectedVariant = ele;
          productVariantElement.selectVariant(parseInt(variantId));
          if(selectedVariant != null) {
            const variantId = selectedVariant.id;
            let longer_lead = null;
            variantsMetafields.forEach(function(variantMetafield) {
                if (variantMetafield.variant_id == variantId) {
                    longer_lead = variantMetafield.metafield_value;
                }
            });
            let inventory = selectedVariant.inventory_quantity;
            let policy = selectedVariant.inventory_policy;
            
            if(inventory > 0) {
              $('div.stock-message').removeClass('active');
              $('div#inStockHasInv').addClass('active');
              if(cartCount > 0) {
                $('div[data-shopify="payment-button"]').hide();
              } else {
                $('div[data-shopify="payment-button"]').show();
              }
            } else if (inventory <= 0 && policy == 'continue' && longer_lead == 'true') {
              $('div.stock-message').removeClass('active');
              $('div#longerLead').addClass('active');
              $('div.product__info').addClass('available');
              if(cartCount > 0) {
                $('div[data-shopify="payment-button"]').hide();
              } else {
                $('div[data-shopify="payment-button"]').show();
              }

            } else if (inventory <= 0 && policy == 'continue') {
              $('div.stock-message').removeClass('active');
              $('div#inStockMsg').addClass('active');
              if(cartCount > 0) {
                $('div[data-shopify="payment-button"]').hide();
              } else {
                $('div[data-shopify="payment-button"]').show();
              }

            } else {
              $('div.stock-message').removeClass('active');
              $('div#outOfStockMsg').addClass('active');
              $('div[data-shopify="payment-button"]').hide();
            }
          }
        }
      });
    }  else if (product && !variantId) {
        if(product.variants.length > 1 && product.type != 'Sold Out') {
          let availableVariant = getFirstAvailableVariantId(product);
          const productVariantElement = document.querySelector('product-variants');
          productVariantElement.selectVariant(availableVariant);
          var variants = product.variants;
          if(product.variants) {
            variants.forEach((ele) => {
            if(ele.id === availableVariant) {
              selectedVariant = ele;
              if(selectedVariant != null) {
              const variantId = selectedVariant.id;
              let longer_lead = null;
              variantsMetafields.forEach(function(variantMetafield) {
                  if (variantMetafield.variant_id == variantId) {
                      longer_lead = variantMetafield.metafield_value;
                  }
              });
              let inventory = selectedVariant.inventory_quantity;
              let policy = selectedVariant.inventory_policy;
                
            if(inventory > 0) {
                  $('div.stock-message').removeClass('active');
                  $('div#inStockHasInv').addClass('active');
                  $('div.product__info').addClass('available');
                  if(cartCount > 0) {
                    $('div[data-shopify="payment-button"]').hide();
                  } else {
                    $('div[data-shopify="payment-button"]').show();
                  }
                } else if (inventory <= 0 && policy == 'continue' && longer_lead == 'true') {
                  $('div.stock-message').removeClass('active');
                  $('div#longerLead').addClass('active');
                  $('div.product__info').addClass('available');
                  if(cartCount > 0) {
                    $('div[data-shopify="payment-button"]').hide();
                  } else {
                    $('div[data-shopify="payment-button"]').show();
                  }
                } else if (inventory <= 0 && policy == 'continue') {
                  $('div.stock-message').removeClass('active');
                  $('div#inStockMsg').addClass('active');
                  $('div.product__info').addClass('available');
                  if(cartCount > 0) {
                    $('div[data-shopify="payment-button"]').hide();
                  } else {
                    $('div[data-shopify="payment-button"]').show();
                  }
                } else {
                  $('div.stock-message').removeClass('active');
                  $('div#outOfStockMsg').addClass('active');
                  $('div.product__info').removeClass('available');
                  $('div[data-shopify="payment-button"]').hide();
                }
              }
            }
          });
          }
          
        } else if (product.type == 'Sold Out') {
          $('div.stock-message').removeClass('active');
          $('div#outOfStockMsg').addClass('active');
        } else if (product.variants.length == 1) {
          let inventory = product.variants[0].inventory_quantity;
          let policy = product.variants[0].inventory_policy;
          const variantId = product.variants[0].id;
          let longer_lead = null;
          variantsMetafields.forEach(function(variantMetafield) {
              if (variantMetafield.variant_id == variantId) {
                  longer_lead = variantMetafield.metafield_value;
              }
          });
          if(inventory > 0) {
            $('div.stock-message').removeClass('active');
            $('div#inStockHasInv').addClass('active');
            if(cartCount > 0) {
              $('div[data-shopify="payment-button"]').hide();
            } else {
              $('div[data-shopify="payment-button"]').show();
            }
          } else if (inventory <= 0 && policy == 'continue' && longer_lead == 'true') {
            $('div.stock-message').removeClass('active');
            $('div#longerLead').addClass('active');
            $('div.product__info').addClass('available');
            if(cartCount > 0) {
              $('div[data-shopify="payment-button"]').hide();
            } else {
              $('div[data-shopify="payment-button"]').show();
            }
          } else if (inventory <= 0 && policy == 'continue') {
            $('div.stock-message').removeClass('active');
            $('div#inStockMsg').addClass('active');
            if(cartCount > 0) {
              $('div[data-shopify="payment-button"]').hide();
            } else {
              $('div[data-shopify="payment-button"]').show();
            }
          } else {
            $('div.stock-message').removeClass('active');
            $('div#outOfStockMsg').addClass('active');
            $('div[data-shopify="payment-button"]').hide();
          }
        }
      }
  } );

  if(cartCount > 0) {
    $('div[data-shopify="payment-button"]').hide();
  }
});

document.addEventListener('variant:changed', function(event) {
  var variantsMetafields = jQuery.parseJSON($("#hidden-variant-metafields-container").html());
  var cartCount = parseInt($('cart-count').text());
  
  let variant = event.detail.variant; // Gives you access to the whole variant details

  const variantId = variant.id;
  let longer_lead = null;
  
  variantsMetafields.forEach(function(variantMetafield) {
      if (variantMetafield.variant_id == variantId) {
          longer_lead = variantMetafield.metafield_value;
      }
  });


  if(variant) {
    let inventory = variant.inventory_quantity;
    let policy = variant.inventory_policy;
    console.log(longer_lead);
    if(inventory > 0) {
      $('div.stock-message').removeClass('active');
      $('div#inStockHasInv').addClass('active');
      $('div.product__info').addClass('available');
      if(cartCount > 0) {
        $('div[data-shopify="payment-button"]').hide();
      } else {
        $('div[data-shopify="payment-button"]').show();
      }
    } else if (inventory <= 0 && policy == 'continue' && longer_lead == 'true') {
      $('div.stock-message').removeClass('active');
      $('div#longerLead').addClass('active');
      $('div.product__info').addClass('available');
      if(cartCount > 0) {
        $('div[data-shopify="payment-button"]').hide();
      } else {
        $('div[data-shopify="payment-button"]').show();
      }
    } else if (inventory <= 0 && policy == 'continue') {
      $('div.stock-message').removeClass('active');
      $('div#inStockMsg').addClass('active');
      $('div.product__info').addClass('available');
      if(cartCount > 0) {
        $('div[data-shopify="payment-button"]').hide();
      } else {
        $('div[data-shopify="payment-button"]').show();
      }
    } else {
      $('div.stock-message').removeClass('active');
      $('div#outOfStockMsg').addClass('active');
      $('div.product__info').removeClass('available');
      $('div[data-shopify="payment-button"]').hide();
    }
  } else {
    jQuery.getJSON(window.Shopify.routes.root + sanitizedPathname +'.js', function(product) {
        if(product && product.type == 'Fine Jewelry') {
            $('div.stock-message').removeClass('active');
            $('div#inStockMsg').addClass('active');
        }
    });
  }

  if(cartCount > 0) {
    $('div[data-shopify="payment-button"]').hide();
  }
});

document.addEventListener('cart:updated', function(event) {
  var cart = event.detail.cart; // Get the updated content of the cart
  if(cart.item_count > 0) {
    $('div[data-shopify="payment-button"]').hide();
  }
});

addEvent(window, 'load', initForm);

var highlight_array = new Array();

function initForm(){
	initializeFocus();
	var activeForm = document.getElementsByTagName('form')[0];
	addEvent(activeForm, 'submit', disableSubmitButton);
	ifInstructs();
	showRangeCounters();
}

function disableSubmitButton() {
	document.getElementById('saveForm').disabled = true;
}

// for radio and checkboxes, they have to be cleared manually, so they are added to the
// global array highlight_array so we dont have to loop through the dom every time.
function initializeFocus(){
	var fields = getElementsByClassName(document, "*", "field");
	
	for(i = 0; i < fields.length; i++) {
		if(fields[i].type == 'radio' || fields[i].type == 'checkbox') {
			fields[i].onclick = function() {highlight(this, 4);};
			fields[i].onfocus = function() {highlight(this, 4);};
		}
		else if(fields[i].className.match('addr') || fields[i].className.match('other')) {
			fields[i].onfocus = function(){highlight(this, 3);};
		}
		else {
			fields[i].onfocus = function(){highlight(this, 2); };
		}
	}
}

function highlight(el, depth){
	if(depth == 2){var fieldContainer = el.parentNode.parentNode;}
	if(depth == 3){var fieldContainer = el.parentNode.parentNode.parentNode;}
	if(depth == 4){var fieldContainer = el.parentNode.parentNode.parentNode.parentNode;}
	
	addClassName(fieldContainer, 'focused', true);
	var focusedFields = getElementsByClassName(document, "*", "focused");
	
	for(i = 0; i < focusedFields.length; i++) {
		if(focusedFields[i] != fieldContainer){
			removeClassName(focusedFields[i], 'focused');
		}
	}
}

function ifInstructs(){
	var container = document.getElementById('public');
	if(container){
		removeClassName(container,'noI');
		var instructs = getElementsByClassName(document,"*","instruct");
		if(instructs == ''){
			addClassName(container,'noI',true);
		}
		if(container.offsetWidth <= 450){
			addClassName(container,'altInstruct',true);
		}
	}
}

function showRangeCounters(){
	counters = getElementsByClassName(document, "em", "currently");
	for(i = 0; i < counters.length; i++) {
		counters[i].style.display = 'inline';
	}
}

function validateRange(ColumnId, RangeType) {
	if(document.getElementById('rangeUsedMsg'+ColumnId)) {
		var field = document.getElementById('Field'+ColumnId);
		var msg = document.getElementById('rangeUsedMsg'+ColumnId);

		switch(RangeType) {
			case 'character':
				msg.innerHTML = field.value.length;
				break;
				
			case 'word':
				var val = field.value;
				val = val.replace(/\n/g, " ");
				var words = val.split(" ");
				var used = 0;
				for(i =0; i < words.length; i++) {
					if(words[i].replace(/\s+$/,"") != "") used++;
				}
				msg.innerHTML = used;
				break;
				
			case 'digit':
				msg.innerHTML = field.value.length;
				break;
		}
	}
}

/*--------------------------------------------------------------------------*/

//http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];		
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}	
	}
	return (arrReturnElements)
}

//http://www.bigbold.com/snippets/posts/show/2630
function addClassName(objElement, strClass, blnMayAlreadyExist){
   if ( objElement.className ){
      var arrList = objElement.className.split(' ');
      if ( blnMayAlreadyExist ){
         var strClassUpper = strClass.toUpperCase();
         for ( var i = 0; i < arrList.length; i++ ){
            if ( arrList[i].toUpperCase() == strClassUpper ){
               arrList.splice(i, 1);
               i--;
             }
           }
      }
      arrList[arrList.length] = strClass;
      objElement.className = arrList.join(' ');
   }
   else{  
      objElement.className = strClass;
      }
}

//http://www.bigbold.com/snippets/posts/show/2630
function removeClassName(objElement, strClass){
   if ( objElement.className ){
      var arrList = objElement.className.split(' ');
      var strClassUpper = strClass.toUpperCase();
      for ( var i = 0; i < arrList.length; i++ ){
         if ( arrList[i].toUpperCase() == strClassUpper ){
            arrList.splice(i, 1);
            i--;
         }
      }
      objElement.className = arrList.join(' ');
   }
}

//http://ejohn.org/projects/flexible-javascript-events/
function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj["e"+type+fn] = fn;
    obj[type+fn] = function() { obj["e"+type+fn]( window.event ) };
    obj.attachEvent( "on"+type, obj[type+fn] );
  } 
  else{
    obj.addEventListener( type, fn, false );	
  }
}