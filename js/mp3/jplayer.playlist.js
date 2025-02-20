!(function (s, t) {
  (adonisJPlayerPlaylist = function (t, e, i) {
    var l = this;
    (this.current = 0),
      (this.loop = !1),
      (this.shuffled = !1),
      (this.removing = !1),
      (this.cssSelector = s.extend({}, this._cssSelector, t)),
      (this.options = s.extend(
        !0,
        {
          keyBindings: {
            next: {
              key: 221,
              fn: function () {
                l.next();
              },
            },
            previous: {
              key: 219,
              fn: function () {
                l.previous();
              },
            },
            shuffle: {
              key: 83,
              fn: function () {
                l.shuffle();
              },
            },
          },
          stateClass: { shuffled: "jp-state-shuffled" },
        },
        this._options,
        i
      )),
      (this.playlist = []),
      (this.original = []),
      this._initPlaylist(e),
      (this.cssSelector.details =
        this.cssSelector.cssSelectorAncestor + " .jp-details"),
      (this.cssSelector.playlist =
        this.cssSelector.cssSelectorAncestor + " .jp-playlist"),
      (this.cssSelector.next =
        this.cssSelector.cssSelectorAncestor + " .jp-next"),
      (this.cssSelector.previous =
        this.cssSelector.cssSelectorAncestor + " .jp-previous"),
      (this.cssSelector.shuffle =
        this.cssSelector.cssSelectorAncestor + " .jp-shuffle"),
      (this.cssSelector.shuffleOff =
        this.cssSelector.cssSelectorAncestor + " .jp-shuffle-off"),
      (this.options.cssSelectorAncestor = this.cssSelector.cssSelectorAncestor),
      (this.options.repeat = function (s) {
        l.loop = s.jPlayer.options.loop;
      }),
      s(this.cssSelector.jPlayer).bind(s.jPlayer.event.ready, function () {
        l._init();
      }),
      s(this.cssSelector.jPlayer).bind(s.jPlayer.event.ended, function () {
        l.next();
      }),
      s(this.cssSelector.jPlayer).bind(s.jPlayer.event.play, function () {
        s(this).jPlayer("pauseOthers");
      }),
      s(this.cssSelector.jPlayer).bind(s.jPlayer.event.resize, function (t) {
        t.jPlayer.options.fullScreen
          ? s(l.cssSelector.details).show()
          : s(l.cssSelector.details).hide();
      }),
      s(this.cssSelector.previous).click(function (s) {
        s.preventDefault(), l.previous(), l.blur(this);
      }),
      s(this.cssSelector.next).click(function (s) {
        s.preventDefault(), l.next(), l.blur(this);
      }),
      s(this.cssSelector.shuffle).click(function (t) {
        t.preventDefault(),
          l.shuffled &&
          s(l.cssSelector.jPlayer).jPlayer("option", "useStateClassSkin")
            ? l.shuffle(!1)
            : l.shuffle(!0),
          l.blur(this);
      }),
      s(this.cssSelector.shuffleOff)
        .click(function (s) {
          s.preventDefault(), l.shuffle(!1), l.blur(this);
        })
        .hide(),
      this.options.fullScreen || s(this.cssSelector.details).hide(),
      s(this.cssSelector.playlist + " ul").empty(),
      this._createItemHandlers(),
      s(this.cssSelector.jPlayer).jPlayer(this.options);
  }),
    (adonisJPlayerPlaylist.prototype = {
      _cssSelector: {
        jPlayer: "#jquery_jplayer_1",
        cssSelectorAncestor: "#jp_container_1",
      },
      _options: {
        playlistOptions: {
          autoPlay: !1,
          loopOnPrevious: !1,
          shuffleOnLoop: !0,
          enableRemoveControls: !1,
          displayTime: "slow",
          addTime: "fast",
          removeTime: "fast",
          shuffleTime: "slow",
          itemClass: "jp-playlist-item",
          freeGroupClass: "jp-free-media",
          freeItemClass: "jp-playlist-item-free",
          removeItemClass: "jp-playlist-item-remove",
        },
      },
      option: function (s, t) {
        if (void 0 === t) return this.options.playlistOptions[s];
        switch (((this.options.playlistOptions[s] = t), s)) {
          case "enableRemoveControls":
            this._updateControls();
            break;
          case "itemClass":
          case "freeGroupClass":
          case "freeItemClass":
          case "removeItemClass":
            this._refresh(!0), this._createItemHandlers();
        }
        return this;
      },
      _init: function () {
        var s = this;
        this._refresh(function () {
          s.options.playlistOptions.autoPlay
            ? s.play(s.current)
            : s.select(s.current);
        });
      },
      _initPlaylist: function (t) {
        (this.current = 0),
          (this.shuffled = !1),
          (this.removing = !1),
          (this.original = s.extend(!0, [], t)),
          this._originalPlaylist();
      },
      _originalPlaylist: function () {
        var t = this;
        (this.playlist = []),
          s.each(this.original, function (s) {
            t.playlist[s] = t.original[s];
          });
      },
      _refresh: function (t) {
        var e = this;
        if (t && !s.isFunction(t))
          s(this.cssSelector.playlist + " ul").empty(),
            s.each(this.playlist, function (t) {
              s(e.cssSelector.playlist + " ul").append(
                e._createListItem(e.playlist[t])
              );
            }),
            this._updateControls();
        else {
          var i = s(this.cssSelector.playlist + " ul").children().length
            ? this.options.playlistOptions.displayTime
            : 0;
          s(this.cssSelector.playlist + " ul").slideUp(i, function () {
            var i = s(this);
            s(this).empty(),
              s.each(e.playlist, function (s) {
                i.append(e._createListItem(e.playlist[s]));
              }),
              e._updateControls(),
              s.isFunction(t) && t(),
              e.playlist.length
                ? s(this).slideDown(e.options.playlistOptions.displayTime)
                : s(this).show();
          });
        }
      },
      _createListItem: function (t) {
        var e = this,
          i = /{(.*?\})/,
          l = void 0 !== t.artist ? t.artist.replace(i, "") : null,
          a = void 0 !== t.artist ? t.artist.match(i, "") : null,
          o = "";
        null != a
          ? (o += '<a href="' + a[1].replace("}", "") + '">' + l + "</a>")
          : (o += l);
        var n = "id-" + Math.random().toString(36).substr(2, 16),
          r =
            "<li class='item clearfix' id='" +
            n +
            "'><div class='playlist-item'>";
        (r +=
          '<div class="img-box music-img-box song-poster"><img src="' +
          t.poster +
          '" alt=""><div class="hover-state"><span class="play-btn-dark"><i class="flaticon-play-button"></i></span></div></div>'),
          (r +=
            '<div class="meta"><span class="now playlist-animate playing"><span class="bar n1">A</span><span class="bar n2">B</span><span class="bar n3">c</span></span><div class="hover-state"> <div class="d-flex justify-content-end align-items-center"><a href="#" class="mr-2"></span></a></div></div> </div>');
        var c = document.createElement("audio");
        if (
          ((c.autoplay = !1),
          (c.controls = !1),
          (c.preload = !1),
          (c.src = t.mp3),
          (c.style.display = "none"),
          s("body").append(c),
          (c.onloadedmetadata = function () {
            var t;
            (t =
              '<span class="jp-time">' +
              Math.floor(Math.floor(c.duration) / 60) +
              ":" +
              (Math.floor(c.duration) % 60) +
              "</span>"),
              c.parentNode.removeChild(c),
              s("#" + n + " .meta").append(t);
          }),
          t.free)
        ) {
          var h = !0;
          (r +=
            "<span class='" +
            this.options.playlistOptions.freeGroupClass +
            "'>("),
            s.each(t, function (t, i) {
              s.jPlayer.prototype.format[t] &&
                (h ? (h = !1) : (r += " | "),
                (r +=
                  "<a class='" +
                  e.options.playlistOptions.freeItemClass +
                  "' href='" +
                  i +
                  "' tabindex='-1'>" +
                  t +
                  "</a>"));
            }),
            (r += ")</span>");
        }
        return (
          (r +=
            "<a href='javascript:;' class='" +
            this.options.playlistOptions.itemClass +
            "'>" +
            t.title +
            "</a>"),
          (r += t.artist ? "<p class='jp-artist'>" + o + "</p>" : ""),
          (r += "</div></li>")
        );
      },
      _createItemHandlers: function () {
        var t = this;
        s(this.cssSelector.playlist)
          .off("click", "a." + this.options.playlistOptions.itemClass)
          .on(
            "click",
            "a." + this.options.playlistOptions.itemClass,
            function (e) {
              e.preventDefault();
              var i = s(this).parent().parent().index();
              t.current !== i
                ? t.play(i)
                : s(t.cssSelector.jPlayer).jPlayer("play"),
                t.blur(this);
            }
          ),
          s(this.cssSelector.playlist)
            .off("click", "a." + this.options.playlistOptions.freeItemClass)
            .on(
              "click",
              "a." + this.options.playlistOptions.freeItemClass,
              function (e) {
                e.preventDefault(),
                  s(this)
                    .parent()
                    .parent()
                    .find("." + t.options.playlistOptions.itemClass)
                    .click(),
                  t.blur(this);
              }
            ),
          s(this.cssSelector.playlist)
            .off("click", "a." + this.options.playlistOptions.removeItemClass)
            .on(
              "click",
              "a." + this.options.playlistOptions.removeItemClass,
              function (e) {
                e.preventDefault();
                var i = s(this).parent().parent().index();
                t.remove(i), t.blur(this);
              }
            );
      },
      _updateControls: function () {
        this.options.playlistOptions.enableRemoveControls
          ? s(
              this.cssSelector.playlist +
                " ." +
                this.options.playlistOptions.removeItemClass
            ).show()
          : s(
              this.cssSelector.playlist +
                " ." +
                this.options.playlistOptions.removeItemClass
            ).hide(),
          this.shuffled
            ? s(this.cssSelector.jPlayer).jPlayer("addStateClass", "shuffled")
            : s(this.cssSelector.jPlayer).jPlayer(
                "removeStateClass",
                "shuffled"
              ),
          s(this.cssSelector.shuffle).length &&
            s(this.cssSelector.shuffleOff).length &&
            (this.shuffled
              ? (s(this.cssSelector.shuffleOff).show(),
                s(this.cssSelector.shuffle).hide())
              : (s(this.cssSelector.shuffleOff).hide(),
                s(this.cssSelector.shuffle).show()));
      },
      _highlight: function (t) {
        this.playlist.length &&
          void 0 !== t &&
          (s(this.cssSelector.playlist + " .jp-playlist-current").removeClass(
            "jp-playlist-current"
          ),
          s(this.cssSelector.playlist + " li:nth-child(" + (t + 1) + ")")
            .addClass("jp-playlist-current")
            .find(".jp-playlist-item")
            .addClass("jp-playlist-current"));
      },
      setPlaylist: function (s) {
        this._initPlaylist(s), this._init();
      },
      add: function (t, e) {
        s(this.cssSelector.playlist + " ul")
          .append(this._createListItem(t))
          .find("li:last-child")
          .hide()
          .slideDown(this.options.playlistOptions.addTime),
          this._updateControls(),
          this.original.push(t),
          this.playlist.push(t),
          e
            ? this.play(this.playlist.length - 1)
            : 1 === this.original.length && this.select(0);
      },
      remove: function (t) {
        var e = this;
        return void 0 === t
          ? (this._initPlaylist([]),
            this._refresh(function () {
              s(e.cssSelector.jPlayer).jPlayer("clearMedia");
            }),
            !0)
          : !this.removing &&
              (0 <= (t = t < 0 ? e.original.length + t : t) &&
                t < this.playlist.length &&
                ((this.removing = !0),
                s(
                  this.cssSelector.playlist + " li:nth-child(" + (t + 1) + ")"
                ).slideUp(this.options.playlistOptions.removeTime, function () {
                  if ((s(this).remove(), e.shuffled)) {
                    var i = e.playlist[t];
                    s.each(e.original, function (s) {
                      if (e.original[s] === i)
                        return e.original.splice(s, 1), !1;
                    }),
                      e.playlist.splice(t, 1);
                  } else e.original.splice(t, 1), e.playlist.splice(t, 1);
                  e.original.length
                    ? t === e.current
                      ? ((e.current =
                          t < e.original.length
                            ? e.current
                            : e.original.length - 1),
                        e.select(e.current))
                      : t < e.current && e.current--
                    : (s(e.cssSelector.jPlayer).jPlayer("clearMedia"),
                      (e.current = 0),
                      (e.shuffled = !1),
                      e._updateControls()),
                    (e.removing = !1);
                })),
              !0);
      },
      select: function (t) {
        0 <= (t = t < 0 ? this.original.length + t : t) &&
        t < this.playlist.length
          ? ((this.current = t),
            this._highlight(t),
            s(this.cssSelector.jPlayer).jPlayer(
              "setMedia",
              this.playlist[this.current]
            ))
          : (this.current = 0);
      },
      play: function (t) {
        0 <= (t = t < 0 ? this.original.length + t : t) &&
        t < this.playlist.length
          ? this.playlist.length &&
            (this.select(t), s(this.cssSelector.jPlayer).jPlayer("play"))
          : void 0 === t && s(this.cssSelector.jPlayer).jPlayer("play");
      },
      pause: function () {
        s(this.cssSelector.jPlayer).jPlayer("pause");
      },
      next: function () {
        var s = this.current + 1 < this.playlist.length ? this.current + 1 : 0;
        this.loop
          ? 0 === s &&
            this.shuffled &&
            this.options.playlistOptions.shuffleOnLoop &&
            this.playlist.length > 1
            ? this.shuffle(!0, !0)
            : this.play(s)
          : s > 0 && this.play(s);
      },
      previous: function () {
        var s =
          this.current - 1 >= 0 ? this.current - 1 : this.playlist.length - 1;
        ((this.loop && this.options.playlistOptions.loopOnPrevious) ||
          s < this.playlist.length - 1) &&
          this.play(s);
      },
      shuffle: function (t, e) {
        var i = this;
        void 0 === t && (t = !this.shuffled),
          (t || t !== this.shuffled) &&
            s(this.cssSelector.playlist + " ul").slideUp(
              this.options.playlistOptions.shuffleTime,
              function () {
                (i.shuffled = t),
                  t
                    ? i.playlist.sort(function () {
                        return 0.5 - Math.random();
                      })
                    : i._originalPlaylist(),
                  i._refresh(!0),
                  e || !s(i.cssSelector.jPlayer).data("jPlayer").status.paused
                    ? i.play(0)
                    : i.select(0),
                  s(this).slideDown(i.options.playlistOptions.shuffleTime);
              }
            );
      },
      blur: function (t) {
        s(this.cssSelector.jPlayer).jPlayer("option", "autoBlur") &&
          s(t).blur();
      },
    });
})(jQuery);


