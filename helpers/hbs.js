const moment = require("moment");

module.exports = {
  formatDate: function (date, format) {
    return moment(date).format(format);
  },
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + " ";
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(" "));
      new_str = new_str.length > 0 ? new_str : str.substr(0, len);
      return new_str + "...";
    }
    return str;
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, "").replace(/&nbsp;/g, " ");
  },
  editIcon: function (
    accomplishmentUser,
    loggedUser,
    accomplishmentId,
    floating = true,
  ) {
    if (accomplishmentUser._id.toString() == loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/accomplishments/edit/${accomplishmentId}" class="btn-floating halfway-fab green darken-2 left"><i class="fas fa-edit fa-small"></i></a>`;
      } else {
        return `<a href="/accomplishments/edit/${accomplishmentId}"><i class="fas fa-edit"></i></a>`;
      }
    } else {
      return "";
    }
  },
};
