export default {
    functional: true,
    props: {
        data: Object,
  
        renderFunction: Function
    },
    render: (h, ctx) => {
        return ctx.props.renderFunction(h, ctx.props.data)
    }
}