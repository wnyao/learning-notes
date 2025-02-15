@Configuration
@Import(StudentRepository.java)
class Config {
    @Bean
    public DriverManagerDatasource dataSource() {
        DriverManagerDataSource ds = new DriverManagerDataSource();
        ds.setDriverClassName(“org.h2.Driver”);
        ds.setUrl(“jdbc:h2:mem:test;DB_CLOSE_DELAY=-1”);
        return ds;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DriverManagerDatasource  ds) {
        return new JdbcTemplate(ds);
    }
}
