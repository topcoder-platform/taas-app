/**
 * Create New Team
 *
 * Container for Create New Team subroutes
 */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CustomerScroll from "components/CustomerScroll";
import "./styles.module.scss";

const CreateNewTeam = (props) => {
  useEffect(() => {
    const script = window.document.createElement("script");
    script.innerHTML = `
      window._chatlio = window._chatlio || [];
      ! function() {
          var t = document.getElementById("chatlio-widget-embed");
          if (t && window.ChatlioReact && _chatlio.init) return void _chatlio.init(t, ChatlioReact);
          for (var e = function(t) {
                  return function() {
                      _chatlio.push([t].concat(arguments))
                  }
              }, i = ["configure", "identify", "track", "show", "hide", "isShown", "isOnline", "page", "open", "showOrHide"], a = 0; a < i.length; a++) _chatlio[i[a]] || (_chatlio[i[a]] = e(i[a]));
          var n = document.createElement("script"),
              c = document.getElementsByTagName("script")[0];
          n.id = "chatlio-widget-embed", n.src = "https://w.chatlio.com/w.chatlio-widget.js", n.async = !0, n.setAttribute("data-embed-version", "2.3");
          n.setAttribute('data-widget-id', 'df6d6a4d-7193-4eaf-648b-4569f0e6b262');
          c.parentNode.insertBefore(n, c);
      }();
    `;
    window.document.body.appendChild(script);
    return () => {
      window.document.body.removeChild(
        document.querySelector("#chatlio-widget")
      );
    };
  }, []);
  const { isLoading } = useSelector((state) => state.searchedRoles);

  return (
    <div>
      {props.children}
      {!isLoading && (
        <div styleName="logos">
          <CustomerScroll />
        </div>
      )}
    </div>
  );
};

export default CreateNewTeam;
