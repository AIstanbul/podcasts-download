/**
 * Created by amel on 02/10/16.
 */

import {Podcast} from "../common/podcast/podcast.component";

export class PodcastListComponent {

    static config = {
        bindings: <any>{
            podcastIdList: '<mhPodcastIdList',
            podcastFilter: '<mhPodcastFilter',
            onPodcastAdd: '&mhOnPodcastAdd'
        },
        controller: PodcastListComponent,
        templateUrl: require('./podcast-list.component.html')
    };

    _podcastList: Podcast[];
    podcastIdList : string[];
    podcastFilter : string;
    onPodcastAdd;

    constructor(private podcastStore, private downloadTrackerStore) {
        'ngInject';
    }

    $onChanges(changes) {
        console.log("PodcastListComponent", "changes", changes);
        if (changes.podcastIdList != null && this.podcastIdList !== undefined) {
            this.loadPodcastListByIds(this.podcastIdList);
        }
        if (this.podcastIdList === undefined) {
            // no podcasts id list is set.
            if (changes.podcastFilter != null && this.podcastFilter === "examples") {
                this.loadDefaultPodcastList();
            }
        }
    }

    loadDefaultPodcastList() {
        this.podcastStore.loadDefaultPodcastList()
            .then(list => this._podcastList = list);
    }

    loadPodcastListByIds(podcastIds : string[]) {
        this.podcastStore.loadPodcastListByIds(podcastIds)
            .then((list) => {
                this._podcastList = list;
            });
    }

   addPodcast({podcast}: {podcast: Podcast}) {
        this.onPodcastAdd({podcast: podcast});
    }
}
