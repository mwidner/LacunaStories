// Generated by CoffeeScript 1.10.0
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Annotator.Plugin.Replies = (function(superClass) {
    extend(Replies, superClass);

    function Replies() {
      this.cancelReply = bind(this.cancelReply, this);
      this.saveReply = bind(this.saveReply, this);
      this.deleteReply = bind(this.deleteReply, this);
      this.drawReplies = bind(this.drawReplies, this);
      this.initReplies = bind(this.initReplies, this);
      this.addReplyLink = bind(this.addReplyLink, this);
      this.hideReplyArea = bind(this.hideReplyArea, this);
      this.addReplyArea = bind(this.addReplyArea, this);
      this.toggleVisibility = bind(this.toggleVisibility, this);
      this.hide = bind(this.hide, this);
      this.show = bind(this.show, this);
      this.removeClasses = bind(this.removeClasses, this);
      this.addClasses = bind(this.addClasses, this);
      this.defaultClass = bind(this.defaultClass, this);
      return Replies.__super__.constructor.apply(this, arguments);
    }

    Replies.prototype.replyClasses = {
      "base": "annotator-reply",
      "hidden": "annotator-reply-hidden",
      "reply": "fa fa-reply",
      "edit": "fa fa-edit",
      "del": "fa fa-trash"
    };

    Replies.prototype.replySelectors = {
      "replyarea": "div#content"
    };

    Replies.prototype.pluginInit = function() {
      if (!Annotator.supported()) {
        return;
      }
      return this.annotator.viewer.addField({
        load: this.initReplies
      });
    };

    Replies.prototype.defaultClass = function(key) {
      return this.replyClasses.base + '-' + key;
    };

    Replies.prototype.addClasses = function(element, key) {
      var className, classNames, i, len, ref, results;
      if (!(key in this.replyClasses)) {
        classNames = this.defaultClass(key);
      } else {
        classNames = this.replyClasses[key];
      }
      ref = classNames.split(" ");
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        className = ref[i];
        results.push(element.classList.add(className));
      }
      return results;
    };

    Replies.prototype.removeClasses = function(element, key) {
      var className, classNames, i, len, ref, results;
      if (!(key in this.replyClasses)) {
        classNames = this.defaultClass(key);
      } else {
        classNames = this.replyClasses[key];
      }
      ref = classNames.split(" ");
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        className = ref[i];
        results.push(element.classList.remove(className));
      }
      return results;
    };

    Replies.prototype.show = function(field) {
      var textarea;
      this.removeClasses(field, 'hidden');
      field.style.display = "block";
      textarea = field.getElementsByTagName('textarea');
      if (textarea.length > 0) {
        return textarea[0].focus();
      }
    };

    Replies.prototype.hide = function(field) {
      this.addClasses(field, 'hidden');
      return field.style.display = "none";
    };

    Replies.prototype.toggleVisibility = function(field) {
      var ref;
      if (ref = this.replyClasses.hidden, indexOf.call(field.classList, ref) >= 0) {
        return this.show(field);
      } else {
        return this.hide(field);
      }
    };

    Replies.prototype.addReplyArea = function(annotation, id, pid, default_text) {
      var baseid, buttons, cancel, field, form, formid, save, textarea, textid;
      if (default_text == null) {
        default_text = '';
      }
      baseid = this.replyClasses.base + "-" + annotation.id + "-" + id + "-" + pid;
      if (default_text.length) {
        baseid += '-update';
      }
      formid = baseid + '-form';
      form = document.getElementById(formid);
      if (form != null) {
        return form;
      }
      form = document.createElement("form");
      form.id = formid;
      this.addClasses(form, 'form');
      textarea = document.createElement("textarea");
      textid = baseid + '-text';
      textarea.id = textid;
      textarea.textContent = default_text;
      this.addClasses(textarea, 'text');
      buttons = document.createElement("div");
      save = document.createElement("a");
      this.addClasses(save, 'button');
      this.addClasses(save, 'save');
      save.innerHTML = "Save";
      save.addEventListener("click", (function(_this) {
        return function() {
          return _this.saveReply(annotation, textarea, id, pid);
        };
      })(this));
      cancel = document.createElement("a");
      this.addClasses(cancel, 'button');
      cancel.innerHTML = "Cancel";
      cancel.addEventListener("click", (function(_this) {
        return function() {
          return _this.cancelReply(textarea);
        };
      })(this));
      buttons.appendChild(cancel);
      buttons.appendChild(save);
      form.appendChild(textarea);
      form.appendChild(buttons);
      field = document.querySelector(this.replySelectors.replyarea);
      field.appendChild(form);
      if ((Annotator.Plugin.RichText != null) && (textid != null)) {
        CKEDITOR.replace(textid);
      }
      return form;
    };

    Replies.prototype.clearReplyArea = function(textarea) {
      textarea.textContent = '';
      if (Annotator.Plugin.RichText != null) {
        return CKEDITOR.instances[textarea.id].setData('');
      }
    };

    Replies.prototype.hideReplyArea = function(textarea) {
      return this.hide(textarea.parentNode);
    };

    Replies.prototype.addReplyLink = function(field, annotation, pid) {
      var replyArea, span;
      if (pid == null) {
        pid = 0;
      }
      span = document.createElement("span");
      span.innerHTML = "Reply";
      this.addClasses(span, 'reply');
      replyArea = this.addReplyArea(annotation, 0, pid);
      this.hide(replyArea);
      span.addEventListener("click", (function(_this) {
        return function() {
          return _this.toggleVisibility(replyArea);
        };
      })(this));
      return field.appendChild(span);
    };

    Replies.prototype.initReplies = function(field, annotation) {
      var n_replies, replies, replies_text, span;
      n_replies = Object.keys(annotation.comments).length;
      replies_text = "Replies";
      if (n_replies === 1) {
        replies_text = "Reply";
      }
      if (n_replies > 0) {
        span = document.createElement("span");
        span.innerHTML = n_replies + " " + replies_text;
        field.appendChild(span);
        replies = this.drawReplies(field, annotation);
        span.addEventListener("click", (function(_this) {
          return function() {
            return _this.toggleVisibility(replies);
          };
        })(this));
        this.hide(replies);
      }
      this.addClasses(field, 'base');
      return this.addReplyLink(field, annotation);
    };

    Replies.prototype.convertRepliesData = function(replies) {
      var data, date, date_string, id, repliesList, reply, monthName;
      repliesList = [];
      for (id in replies) {
        data = replies[id];
        date = new Date(data['created'] * 1000);
        date_string = date.toLocaleString(navigator.language, {year: 'numeric', month:'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false}); // date.getFullYear() + ' ' + date.getMonth() + ' ' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
        reply = {
          'id': id,
          'pid': data['pid'],
          'text': data['comment_body']['und'][0]['safe_value'],
          'author': data['name'],
          'date': date_string,
          'thread': data['thread'],
          'permissions': data['permissions']
        };
        repliesList.push(reply);
      }
      return repliesList;
    };

    Replies.prototype.sortReplies = function(replies) {
      return replies.sort(function(a, b) {
        var thread_a, thread_b;
        thread_a = a['thread'].substring(0, -1);
        thread_b = b['thread'].substring(0, -1);
        if (thread_a < thread_b) {
          return -1;
        } else if (thread_a > thread_b) {
          return 1;
        } else {
          return 0;
        }
      });
    };

    Replies.prototype.replyDepth = function(thread) {
      return (thread.match(/\./g) || []).length;
    };

    Replies.prototype.initList = function(element) {
      var l;
      l = element.getElementsByTagName('ol');
      if (l.length === 0) {
        l = document.createElement('ol');
        this.addClasses(l, 'list');
        element.appendChild(l);
      } else {
        l = l[0];
      }
      return l;
    };

    Replies.prototype.getListAtDepth = function(element, depth) {
      var parent;
      parent = element;
      while (depth--) {
        parent = this.getListAtDepth(this.initList(parent), depth);
      }
      return parent;
    };

    Replies.prototype.addControls = function(element, reply, annotation) {
      var controls, edit, editArea, replyArea, replyLink;
      controls = document.createElement('div');
      this.addClasses(controls, 'controls');
      element.appendChild(controls);
      replyLink = document.createElement('span');
      this.addClasses(replyLink, 'reply');
      controls.appendChild(replyLink);
      replyArea = this.addReplyArea(annotation, 0, reply.pid, '');
      this.hide(replyArea);
      replyLink.addEventListener("click", (function(_this) {
        return function() {
          return _this.toggleVisibility(replyArea);
        };
      })(this));
      if (reply.permissions == null) {
        return;
      }
      if (reply.permissions.edit) {
        edit = document.createElement('span');
        this.addClasses(edit, 'edit');
        editArea = this.addReplyArea(annotation, reply.id, reply.pid, reply.text);
        this.hide(editArea);
        edit.addEventListener("click", (function(_this) {
          return function() {
            return _this.toggleVisibility(editArea);
          };
        })(this));
        return controls.appendChild(edit);
      }
    };

    Replies.prototype.drawReply = function(element, reply, annotation) {
      var author_span, date_span, li, text;
      li = document.createElement("li");
      author_span = document.createElement('span');
      author_span.innerHTML = reply['author'];
      this.addClasses(author_span, 'author');
      date_span = document.createElement('span');
      date_span.innerHTML = reply['date'];
      this.addClasses(date_span, 'date');
      li.appendChild(author_span);
      li.appendChild(date_span);
      li.classList.add('annotator-reply-id-' + reply['id']);
      this.addClasses(li, 'replyarea');
      text = document.createElement("span");
      text.innerHTML = reply['text'];
      this.addClasses(text, 'text');
      li.appendChild(text);
      this.addControls(li, reply, annotation);
      return element.appendChild(li);
    };

    Replies.prototype.drawReplies = function(element, annotation) {
      var depth, el, i, len, list, replies, reply;
      replies = this.convertRepliesData(annotation.comments);
      replies = this.sortReplies(replies);
      list = this.initList(element);
      for (i = 0, len = replies.length; i < len; i++) {
        reply = replies[i];
        depth = this.replyDepth(reply['thread']);
        el = this.getListAtDepth(list, depth);
        this.drawReply(el, reply, annotation);
      }
      return list;
    };

    Replies.prototype.deleteReply = function(annotation, reply) {
      reply.type = 'delete';
      annotation.reply = reply;
      this.annotator.publish('annotationUpdated', [annotation]);
      return delete annotation.reply;
    };

    Replies.prototype.saveReply = function(annotation, textarea, id, pid) {
      annotation.reply = {};
      annotation.reply.pid = pid;
      annotation.reply.type = 'new';
      if (id !== 0) {
        annotation.reply.id = id;
        annotation.reply.type = 'update';
      }
      if ((Annotator.Plugin.RichText != null) && (textarea.id != null)) {
        annotation.reply.text = CKEDITOR.instances[textarea.id].getData();
      } else {
        annotation.reply.text = textarea.value;
      }
      annotation.reply.uid = Drupal.settings.annotator_replies.current_uid;
      this.annotator.publish('annotationUpdated', [annotation]);
      delete annotation.reply;
      this.clearReplyArea(textarea);
      return this.hideReplyArea(textarea);
    };

    Replies.prototype.cancelReply = function(textarea) {
      textarea.value = "";
      return this.hideReplyArea(textarea);
    };

    return Replies;

  })(Annotator.Plugin);

}).call(this);
