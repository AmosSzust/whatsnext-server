--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

-- Started on 2023-02-16 23:13:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- DROP DATABASE whatsnext;
--
-- TOC entry 3360 (class 1262 OID 16402)
-- Name: whatsnext; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE whatsnext WITH TEMPLATE = template0 ENCODING = 'UTF8';


ALTER DATABASE whatsnext OWNER TO postgres;

\connect whatsnext

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16403)
-- Name: contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacts (
    id bigint NOT NULL,
    from_user_id bigint NOT NULL,
    to_user_id bigint NOT NULL,
    contact_when timestamp without time zone NOT NULL,
    shared_events_count integer NOT NULL
);


ALTER TABLE public.contacts OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16406)
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.contacts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 16407)
-- Name: errors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.errors (
    id bigint NOT NULL,
    error_when timestamp without time zone NOT NULL,
    error_message character varying(256) NOT NULL,
    callstack text NOT NULL
);


ALTER TABLE public.errors OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16412)
-- Name: errors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.errors ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.errors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16413)
-- Name: life_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.life_events (
    id integer NOT NULL,
    event_name character varying(100) NOT NULL,
    description character varying(256),
    icon_name character varying(100)
);


ALTER TABLE public.life_events OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16416)
-- Name: life_events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.life_events ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.life_events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16417)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    full_name character varying(50) NOT NULL,
    password character varying(256) NOT NULL,
    email character varying(100) NOT NULL,
    last_active timestamp without time zone NOT NULL,
    photo bytea
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16420)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 16421)
-- Name: users_life_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_life_events (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    event_id integer NOT NULL,
    description character varying(256),
    event_when timestamp without time zone NOT NULL,
    private boolean NOT NULL
);


ALTER TABLE public.users_life_events OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16424)
-- Name: users_life_events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_life_events ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_life_events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3345 (class 0 OID 16403)
-- Dependencies: 214
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

--
-- TOC entry 3347 (class 0 OID 16407)
-- Dependencies: 216
-- Data for Name: errors; Type: TABLE DATA; Schema: public; Owner: postgres
--

--
-- TOC entry 3349 (class 0 OID 16413)
-- Dependencies: 218
-- Data for Name: life_events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (1, 'Birth', 'The day you were born', 'celebration');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (2, 'Pet', 'Adopted/Lost a pet', 'pets');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (3, 'Child', 'A new baby born/adoption', 'crib');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (4, 'Sport', 'A great achievement in sport', 'emoji_events');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (5, 'Entrepreneurship', 'A big dream you started/accomplished', 'handshake');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (6, 'Home/House', 'Bought/Sold your home/house', 'home');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (7, 'Crime', 'Committed a crime', 'gavel');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (8, 'Marriage/Wedding', 'You got married, Hooray!', 'volunteer_activism');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (9, 'Divorce', 'You got divorced, Bummer!', 'safety_divider');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (10, 'Engagement', 'You propose or was proposed', 'diamond');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (11, 'Job', 'Started a new job/Got fired', 'work');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (12, 'Travel', 'Went to see cool places', 'map');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (14, 'Grief', 'Lost someone you care about', 'sentiment_dissatisfied');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (15, 'Graduation', 'Graduated school/college/etc...', 'school');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (16, 'Army', 'Army recruitment or discharged', 'military_tech');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (17, 'Health', 'Health related issues', 'sick');


--
-- TOC entry 3351 (class 0 OID 16417)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

--
-- TOC entry 3353 (class 0 OID 16421)
-- Dependencies: 222
-- Data for Name: users_life_events; Type: TABLE DATA; Schema: public; Owner: postgres
--

--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 215
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_id_seq', 8, true);


--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 217
-- Name: errors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.errors_id_seq', 5, true);


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 219
-- Name: life_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.life_events_id_seq', 16, true);


--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- TOC entry 3366 (class 0 OID 0)
-- Dependencies: 223
-- Name: users_life_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_life_events_id_seq', 11, true);


--
-- TOC entry 3194 (class 2606 OID 16426)
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- TOC entry 3196 (class 2606 OID 16428)
-- Name: errors errors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.errors
    ADD CONSTRAINT errors_pkey PRIMARY KEY (id);


--
-- TOC entry 3198 (class 2606 OID 16430)
-- Name: life_events life_events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.life_events
    ADD CONSTRAINT life_events_pkey PRIMARY KEY (id);


--
-- TOC entry 3202 (class 2606 OID 16432)
-- Name: users_life_events users_life_events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_life_events
    ADD CONSTRAINT users_life_events_pkey PRIMARY KEY (id);


--
-- TOC entry 3200 (class 2606 OID 16434)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 3360
-- Name: DATABASE whatsnext; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE whatsnext FROM PUBLIC;
REVOKE ALL ON DATABASE whatsnext FROM postgres;


-- Completed on 2023-02-16 23:13:32

--
-- PostgreSQL database dump complete
--

