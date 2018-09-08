import { func } from "prop-types";

export function fetchSources() {
	return fetch("http://localhost:3000/sources")
	.then(res => {
		return res.json();
	})
}

export function fetchFiles(source) {
	if(source == "") source = "/media/mdakram28/Data/projects/cpp/sources";
	return fetch("http://localhost:3000/files?source="+encodeURIComponent(source))
	.then(res => {
		return res.json();
	});
}

export function fetchTimeline(file) {
	if(file == "") file = "fib.c";
	return fetch("http://localhost:3000/timeline?file="+encodeURIComponent(file))
	.then(res => {
		return res.json();
	});
}