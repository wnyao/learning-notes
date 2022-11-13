# Optimization

- Avoid multiple rendering

### Bifurcate business logic from UI component

- Separate business logic from UI component, helps improve scalability and continuous delivery.
- Keeping the code clean

### Avoid multiple rendering

- With react hooks such as `useCallback, useMemo, memo`

### Speed up application

- Code splitting, such as `React.lazy`
- Tree shaking capabilities, Dependency optimization plugin from webpack
- Gzip compression in interacting with web server
- lazy loading image `<img src="..." loading="lazy">`
- Reduce use of irrelevant dependency for small feature

### Reference

- [Optimization Techniques and Best Practices for React Application](https://vinayds.hashnode.dev/optimization-techniques-and-best-practices-for-react-application?source=tw1122)
