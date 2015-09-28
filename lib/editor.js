var React = require('react');
var MediumEditor = require('medium-editor');

module.exports = React.createClass({
  displayName: 'MediumEditor',

  getInitialState() {
    return {
      text: this.props.text
    };
  },

  getDefaultProps() {
    return {
      tag: 'div'
    };
  },

  componentDidMount() {
    var dom = React.findDOMNode(this);
    this.medium = new MediumEditor(dom, this.props.options);
    this.medium.subscribe('editableInput', (e) => {
      this._updated = true;
      this.change(dom.innerHTML);
    });
  },

  componentWillUnmount() {
    this.medium.destroy();
  },

  componentWillReceiveProps(nextProps) {
    var dom = React.findDOMNode(this);
    if(nextProps.text !== dom.innerHTML && !this._updated) {
      this.setState({text: nextProps.text});
    }

    if(this._updated) this._updated = false;
  },

  render() {
    return React.createElement(this.props.tag, {
      className: this.props.className,
      contentEditable: true,
      dangerouslySetInnerHTML: {__html: this.state.text}
    });
  },

  change(text) {
    if(this.props.onChange) this.props.onChange(text);
  }
});
