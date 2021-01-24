// Refer: https://dev.to/hunterjsbit/react-infinite-scroll-in-few-lines-588f

import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
  useContext,
} from "react";
import Moment from "react-moment";
import { Input, Badge, Table, Avatar, Card, Button } from "components";
import { listUserReposAPI, getUserAPI } from "apis";
import { BoundaryProvider, BoundaryContext } from "contexts";

export const Home = () => {
  const [username, setUsername] = useState("developit");
  const timeout = null;

  const onSearch = (e) => {
    const { value } = e.currentTarget;
    clearTimeout(timeout);
    timeout = setTimeout(() => setUsername(value), 3000);
  };

  return (
    <div className="container">
      <Input
        className="search-input"
        onChange={onSearch}
        placeholder="Search GitHub username"
      />
      <BoundaryProvider>
        <Profile username={username} />
        <Repositories username={username} />
      </BoundaryProvider>
    </div>
  );
};

const Repositories = (props) => {
  const { username } = props;
  const { setLoading, setError } = useContext(BoundaryContext);
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(0);
  const loader = useRef(null);

  const listUserRepos = async () => {
    try {
      setLoading(true);
      const res = await listUserReposAPI(username, page);
      if (res.message) {
        setError(res.message);
        return;
      }

      setRepos(repos.concat(res));
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) setPage((page) => page + 1); // IMPORTANT: has to use function else same page number will be requery
  };

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });
    observer.observe(loader.current);
  }, []);

  // query for page change
  useEffect(() => {
    listUserRepos();
  }, [page]);

  // for search
  useEffect(() => {
    setRepos([]);
    listUserRepos();
  }, [username]);

  return (
    <section className="repositories my-5">
      <div>
        {repos.length ? (
          <Table data={repos}>
            {({ data, index }) => <Repo key={data.name} data={data} />}
          </Table>
        ) : null}
        <div className="loading text-center my-5" ref={loader} />
      </div>
    </section>
  );
};

const Repo = (props) => {
  const { name, description, created_at, git_url, language } = props.data;

  return (
    <Card className="repo" onClick={() => window.open(git_url)}>
      <div className="column">
        <div className="d-flex flex-grow-1 mb-3">
          <Badge>{language}</Badge>
        </div>
        <div className="d-flex flex-grow-1">
          <h5 className="card-title">
            <a href={git_url} target="_blank">
              {name}
            </a>
          </h5>
        </div>
        <div className="d-flex flex-grow-1">
          <p className="card-text my-2">{description}</p>
        </div>
        <div className="d-flex flex-grow-1">
          <p className="card-text my-2">
            <small>
              <span>Created at </span>
              <Moment format="DD MMM YYYY">{created_at}</Moment>
            </small>
          </p>
        </div>
      </div>
    </Card>
  );
};

const Profile = (props) => {
  const { username } = props;
  const { setLoading, setError } = useContext(BoundaryContext);
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await getUserAPI(username);
      setUser(res);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [username]);

  return (
    <header>
      <div className="row my-5 align-items-center text-center text-sm-center text-md-start">
        <div className="col-sm-12 col-md-4 col-lg-3 my-4">
          <Avatar src={user.avatar_url} />
        </div>
        <div className="col my-4">
          <div>
            <h3>
              <b>{user.name}</b>
            </h3>
            <small>
              <h5>{user.login}</h5>
              <h5>{user.location}</h5>
              <p>
                <a href={user.blog} target="_blank">
                  {user.blog}
                </a>
              </p>
            </small>
          </div>
          <p>{user.bio}</p>
          {user.html_url && (
            <div>
              <Button onClick={() => window.open(user.html_url)}>
                View on GitHub
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
