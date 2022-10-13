--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-10-10 00:09:52

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

DROP DATABASE whatsnext;
--
-- TOC entry 3348 (class 1262 OID 16394)
-- Name: whatsnext; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE whatsnext WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';


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
-- TOC entry 218 (class 1259 OID 16430)
-- Name: contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacts (
    id bigint NOT NULL,
    from_user_id bigint NOT NULL,
    to_user_id bigint NOT NULL,
    contact_when date NOT NULL,
    shared_events_count integer NOT NULL
);


ALTER TABLE public.contacts OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16429)
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
-- TOC entry 212 (class 1259 OID 16410)
-- Name: errors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.errors (
    id bigint NOT NULL,
    error_when date NOT NULL,
    error_message character varying(256) NOT NULL,
    callstack text NOT NULL
);


ALTER TABLE public.errors OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16417)
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
-- TOC entry 210 (class 1259 OID 16400)
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
-- TOC entry 214 (class 1259 OID 16418)
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
-- TOC entry 209 (class 1259 OID 16395)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    full_name character varying(50) NOT NULL,
    password character varying(256) NOT NULL,
    email character varying(100) NOT NULL,
    last_active character varying(10) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16419)
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
-- TOC entry 211 (class 1259 OID 16405)
-- Name: users_life_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_life_events (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    event_id integer NOT NULL,
    description character varying(256),
    event_when date NOT NULL
);


ALTER TABLE public.users_life_events OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16420)
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
-- TOC entry 3342 (class 0 OID 16430)
-- Dependencies: 218
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3336 (class 0 OID 16410)
-- Dependencies: 212
-- Data for Name: errors; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3334 (class 0 OID 16400)
-- Dependencies: 210
-- Data for Name: life_events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (1, 'Birth', 'The day you were born', 'celebration');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (2, 'Pet', 'Adopted/Lost a pet', 'pets');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (3, 'Child Birth', 'A new baby born', 'crib');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (4, 'Child Adoption', 'You adopted a child', 'child_care');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (5, 'Breakup', 'A separation in your romantic life', 'heart_broken');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (6, 'Home/House', 'Bought/Sold your home/house', 'home');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (7, 'Crime', 'Committed a crime', 'gavel');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (8, 'Marriage/Wedding', 'You got married, Hooray!', 'volunteer_activism');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (9, 'Divorce', 'You got divorced, Bummer!', 'safety_divider');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (10, 'Engagement', 'You propose or was proposed', 'diamond');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (11, 'Job', 'Started a new job/Got fired', 'work');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (12, 'Travel', 'Went to see cool places', 'map');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (15, 'Graduation', 'Graduated school/college/etc...', 'school');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (14, 'Grief', 'Lost someone you care', 'sentiment_dissatisfied');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (16, 'Army', 'Army recruitment or discharged', 'military_tech');
INSERT INTO public.life_events (id, event_name, description, icon_name) OVERRIDING SYSTEM VALUE VALUES (17, 'Health', 'Health related issues', 'sick');


--
-- TOC entry 3333 (class 0 OID 16395)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3335 (class 0 OID 16405)
-- Dependencies: 211
-- Data for Name: users_life_events; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3350 (class 0 OID 0)
-- Dependencies: 217
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_id_seq', 8, true);


--
-- TOC entry 3351 (class 0 OID 0)
-- Dependencies: 213
-- Name: errors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.errors_id_seq', 3, true);


--
-- TOC entry 3352 (class 0 OID 0)
-- Dependencies: 214
-- Name: life_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.life_events_id_seq', 16, true);


--
-- TOC entry 3353 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- TOC entry 3354 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_life_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_life_events_id_seq', 10, true);


--
-- TOC entry 3193 (class 2606 OID 16434)
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- TOC entry 3191 (class 2606 OID 16416)
-- Name: errors errors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.errors
    ADD CONSTRAINT errors_pkey PRIMARY KEY (id);


--
-- TOC entry 3187 (class 2606 OID 16404)
-- Name: life_events life_events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.life_events
    ADD CONSTRAINT life_events_pkey PRIMARY KEY (id);


--
-- TOC entry 3189 (class 2606 OID 16409)
-- Name: users_life_events users_life_events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_life_events
    ADD CONSTRAINT users_life_events_pkey PRIMARY KEY (id);


--
-- TOC entry 3185 (class 2606 OID 16399)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3349 (class 0 OID 0)
-- Dependencies: 3348
-- Name: DATABASE whatsnext; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE whatsnext FROM PUBLIC;
REVOKE ALL ON DATABASE whatsnext FROM postgres;


-- Completed on 2022-10-10 00:09:52

--
-- PostgreSQL database dump complete
--

