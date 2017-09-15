StackExchange.postValidation=function(){function e(e,t,n,i){var r=e.find('input[type="submit"]:visible'),o=r.length&&r.is(":enabled");o&&r.attr("disabled",!0),a(e,i),s(e,t,n,i),l(e),u(e),d(e);var p=function(){1!=t||e.find(E).length?(c(e,i),o&&r.attr("disabled",!1)):setTimeout(p,250)};p()}function t(t,i,a,s,c){e(t,i,s,a);var l,u=function(e){if(e.success)if(c)c(e);else{var n=window.location.href.split("#")[0],r=e.redirectTo.split("#")[0];0==r.indexOf("/")&&(r=window.location.protocol+"//"+window.location.hostname+r),l=!0,window.location=e.redirectTo,n.toLowerCase()==r.toLowerCase()&&window.location.reload(!0)}else e.captchaHtml?e.nocaptcha?StackExchange.nocaptcha.init(e.captchaHtml,u):StackExchange.captcha.init(e.captchaHtml,u):e.errors?(t.find("input[name=priorAttemptCount]").val(function(e,t){return(+t+1||0).toString()}),h(e.errors,t,i,a,e.warnings)):t.find('input[type="submit"]:visible').parent().showErrorMessage(e.message)};t.submit(function(){if(t.find("#answer-from-ask").is(":checked"))return!0;var e=t.find(C);if("[Edit removed during grace period]"==$.trim(e.val()))return m(e,["Comment reserved for system use. Please use an appropriate comment."],p()),!1;o(),StackExchange.navPrevention&&StackExchange.navPrevention.stop();var i=t.find('input[type="submit"]:visible');if(i.parent().addSpinner(),StackExchange.helpers.disableSubmitButton(t),StackExchange.options.site.enableNewTagCreationWarning){var s=t.find(E).parent().find("input#tagnames"),c=s.prop("defaultValue");if(s.val()!==c)return $.ajax({"type":"GET","url":"/posts/new-tags-warning","dataType":"json","data":{"tags":s.val()},"success":function(e){e.showWarning?i.loadPopup({"html":e.html,"dontShow":!0,"prepend":!0,"loaded":function(e){n(e,t,l,a,u)}}):r(t,a,l,u)}}),!1}return setTimeout(function(){r(t,a,l,u)},0),!1})}function n(e,t,n,o,a){e.bind("popupClose",function(){i(t,n)}),e.find(".submit-post").click(function(i){return StackExchange.helpers.closePopups(e),r(t,o,n,a),i.preventDefault(),!1}),e.show()}function i(e,t){StackExchange.helpers.removeSpinner(),t||StackExchange.helpers.enableSubmitButton(e)}function r(e,t,n,r){$.ajax({"type":"POST","dataType":"json","data":e.serialize(),"url":e.attr("action"),"success":r,"error":function(){var n;switch(t){case"question":n="An error occurred submitting the question.";break;case"answer":n="An error occurred submitting the answer.";break;case"edit":n="An error occurred submitting the edit.";break;case"tags":n="An error occurred submitting the tags.";break;case"post":default:n="An error occurred submitting the post."}e.find('input[type="submit"]:visible').parent().showErrorMessage(n)},"complete":function(){i(e,n)}})}function o(){for(var e=0;e<I.length;e++)clearTimeout(I[e]);I=[]}function a(e,t){var n=e.find(k);n.length&&n.blur(function(){I.push(setTimeout(function(){var i=n.val(),r=$.trim(i);if(0==r.length)return x(e,n),void 0;var o=n.data("min-length");if(o&&r.length<o)return m(n,[function(e){return 1==e.minLength?"Title must be at least "+e.minLength+" character.":"Title must be at least "+e.minLength+" characters."}({"minLength":o})],p()),void 0;var a=n.data("max-length");return a&&r.length>a?(m(n,[function(e){return 1==e.maxLength?"Title cannot be longer than "+e.maxLength+" character.":"Title cannot be longer than "+e.maxLength+" characters."}({"maxLength":a})],p()),void 0):($.ajax({"type":"POST","url":"/posts/validate-title","data":{"title":i},"success":function(i){i.success?x(e,n):m(n,i.errors.Title,p()),"edit"!=t&&g(e,n,i.warnings.Title)},"error":function(){x(e,n)}}),void 0)},A))})}function s(e,t,n,i){var r=e.find(S);r.length&&r.blur(function(){I.push(setTimeout(function(){var o=r.val(),a=$.trim(o);if(0==a.length)return x(e,r),void 0;if(5==t){var s=r.data("min-length");return s&&a.length<s?m(r,[function(e){return"Wiki Body must be at least "+e.minLength+" characters. You entered "+e.actual+"."}({"minLength":s,"actual":a.length})],p()):x(e,r),void 0}(1==t||2==t)&&$.ajax({"type":"POST","url":"/posts/validate-body","data":{"body":o,"oldBody":r.prop("defaultValue"),"isQuestion":1==t,"isSuggestedEdit":n},"success":function(t){t.success?x(e,r):m(r,t.errors.Body,p()),"edit"!=i&&g(e,r,t.warnings.Body)},"error":function(){x(e,r)}})},A))})}function c(e,t){var n=e.find(E);if(n.length){var i=n.parent().find("input#tagnames");i.blur(function(){I.push(setTimeout(function(){var r=i.val(),o=$.trim(r);return 0==o.length?(x(e,n),void 0):($.ajax({"type":"POST","url":"/posts/validate-tags","data":{"tags":r,"oldTags":i.prop("defaultValue")},"success":function(i){if(i.success?x(e,n):m(n,i.errors.Tags,p()),"edit"!=t&&(g(e,n,i.warnings.Tags),i.source&&i.source.Tags&&i.source.Tags.length)){var r=$("#post-form input[name='warntags']");r&&StackExchange.using("gps",function(){var e=r.val()||"";$.each(i.source.Tags,function(t,n){n&&!r.data("tag-"+n)&&(r.data("tag-"+n,n),e=e.length?e+" "+n:n,StackExchange.gps.track("tag_warning.show",{"tag":n},!0))}),r.val(e),StackExchange.gps.sendPending()})}},"error":function(){x(e,n)}}),void 0)},A))})}}function l(e){var t=e.find(C);t.length&&t.blur(function(){I.push(setTimeout(function(){var n=t.val(),i=$.trim(n);if(0==i.length)return x(e,t),void 0;var r=t.data("min-length");if(r&&i.length<r)return m(t,[function(e){return 1==e.minLength?"Your edit summary must be at least "+e.minLength+" character.":"Your edit summary must be at least "+e.minLength+" characters."}({"minLength":r})],p()),void 0;var o=t.data("max-length");return o&&i.length>o?(m(t,[function(e){return 1==e.maxLength?"Your edit summary cannot be longer than "+e.maxLength+" character.":"Your edit summary cannot be longer than "+e.maxLength+" characters."}({"maxLength":o})],p()),void 0):(x(e,t),void 0)},A))})}function u(e){var t=e.find(T);t.length&&t.blur(function(){I.push(setTimeout(function(){var n=t.val(),i=$.trim(n);if(0==i.length)return x(e,t),void 0;var r=t.data("min-length");if(r&&i.length<r)return m(t,[function(e){return"Wiki Excerpt must be at least "+e.minLength+" characters; you entered "+e.actual+"."}({"minLength":r,"actual":i.length})],p()),void 0;var o=t.data("max-length");return o&&i.length>o?(m(t,[function(e){return"Wiki Excerpt cannot be longer than "+e.maxLength+" characters; you entered "+e.actual+"."}({"maxLength":o,"actual":i.length})],p()),void 0):(x(e,t),void 0)},A))})}function d(e){var t=e.find(_);t.length&&t.blur(function(){I.push(setTimeout(function(){var n=t.val(),i=$.trim(n);return 0==i.length?(x(e,t),void 0):/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,20}$/i.test(i)?(x(e,t),void 0):(m(t,["This email does not appear to be valid."],f()),void 0)},A))})}function p(){var e=$("#sidebar, .sidebar").first().width()||270;return{"position":{"my":"left top","at":"right center"},"css":{"max-width":e,"min-width":e},"closeOthers":!1}}function f(){var e=$("#sidebar, .sidebar").first().width()||270;return{"position":{"my":"left top","at":"right center"},"css":{"min-width":e},"closeOthers":!1}}function h(e,t,n,i,r){if(e){var o=function(){var n=0,o=t.find(E),a=t.find(k),s=t.find(S);m(a,e.Title,p())?n++:x(t,a),r&&g(t,a,r.Title),m(s,e.Body,p())?n++:x(t,s),r&&g(t,s,r.Body),m(o,e.Tags,p())?n++:x(t,o),r&&g(t,o,r.Tags),m(t.find(C),e.EditComment,p())?n++:x(t,t.find(C)),m(t.find(T),e.Excerpt,p())?n++:x(t,t.find(T)),m(t.find(_),e.Email,f())?n++:x(t,t.find(_));var c=t.find(".general-error"),l=e.General&&e.General.length>0;if(l||n>0){if(!c.length){var u=t.find('input[type="submit"]:visible');u.before('<div class="general-error-container"><div class="general-error"></div><br class="cbt" /></div>'),c=t.find(".general-error")}if(l)m(c,e.General,{"position":"inline","css":{"float":"left","margin-bottom":"10px"},"closeOthers":!1,"dismissable":!1});else{x(t,c);var d;switch(i){case"question":d=function(e){return 1==e.specificErrorCount?"Your question couldn't be submitted. Please see the error above.":"Your question couldn't be submitted. Please see the errors above."}({"specificErrorCount":n});break;case"answer":d=function(e){return 1==e.specificErrorCount?"Your answer couldn't be submitted. Please see the error above.":"Your answer couldn't be submitted. Please see the errors above."}({"specificErrorCount":n});break;case"edit":d=function(e){return 1==e.specificErrorCount?"Your edit couldn't be submitted. Please see the error above.":"Your edit couldn't be submitted. Please see the errors above."}({"specificErrorCount":n});break;case"tags":d=function(e){return 1==e.specificErrorCount?"Your tags couldn't be submitted. Please see the error above.":"Your tags couldn't be submitted. Please see the errors above."}({"specificErrorCount":n});break;case"post":default:d=function(e){return 1==e.specificErrorCount?"Your post couldn't be submitted. Please see the error above.":"Your post couldn't be submitted. Please see the errors above."}({"specificErrorCount":n})}c.text(d)}}else t.find(".general-error-container").remove();var h;w()&&($("#sidebar").animate({"opacity":.4},500),h=setInterval(function(){w()||($("#sidebar").animate({"opacity":1},500),clearInterval(h))},500));var v;t.find(".validation-error").each(function(){var e=$(this).offset().top;(!v||v>e)&&(v=e)});var b=function(){for(var e=0;3>e;e++)t.find(".message").animate({"left":"+=5px"},100).animate({"left":"-=5px"},100)};if(v){var y=$(".review-bar").length;v=Math.max(0,v-(y?125:30)),$("html, body").animate({"scrollTop":v},b)}else b()},a=function(){1!=n||t.find(E).length?o():setTimeout(a,250)};a()}}function g(e,t,n){var i=p();if(i.type="warning",!n||0==n.length)return b(e,t),!1;var r=t.data("error-popup"),o=0;return r&&(o=r.height()+5),v(t,n,i,o)}function m(e,t,n){return n.type="error",v(e,t,n)}function v(e,t,n,i){var r,a=n.type;if(!(t&&0!=t.length&&e.length&&$("html").has(e).length))return!1;if(r=1==t.length?t[0]:"<ul><li>"+t.join("</li><li>")+"</li></ul>",r&&r.length>0){var s=e.data(a+"-popup");if(s&&s.is(":visible")){var c=e.data(a+"-message");if(c==r)return s.animateOffsetTop&&s.animateOffsetTop(i||0),!0;s.fadeOutAndRemove()}i>0&&(n.position.offsetTop=i);var l=StackExchange.helpers.showMessage(e,r,n);return l.find("a").attr("target","_blank"),l.click(o),e.addClass("validation-"+a).data(a+"-popup",l).data(a+"-message",r),!0}return!1}function b(e,t){y("warning",e,t)}function x(e,t){y("error",e,t)}function y(e,t,n){if(!n||0==n.length)return!1;var i=n.data(e+"-popup");return i&&i.is(":visible")&&i.fadeOutAndRemove(),n.removeClass("validation-"+e),n.removeData(e+"-popup"),n.removeData(e+"-message"),t.find(".validation-"+e).length||t.find(".general-"+e+"-container").remove(),!0}function w(){var e=!1,t=$("#sidebar, .sidebar").first();if(!t.length)return!1;var n=t.offset().left;return $(".message").each(function(){var t=$(this);return t.offset().left+t.outerWidth()>n?(e=!0,!1):void 0}),e}var k="input#title",S="textarea.wmd-input:first",E=".tag-editor",C="input[id^=edit-comment]",T="textarea#excerpt",_="input#m-address",I=[],A=250;return{"initOnBlur":e,"initOnBlurAndSubmit":t,"showErrorsAfterSubmission":h,"getSidebarPopupOptions":p}}();