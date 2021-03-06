/**
 * Created by amel on 03/10/16.
 */


export class RestangularApp {

    $get(Restangular) {

        'ngInject';

        return Restangular.withConfig((RestangularConfigurer) => {

            RestangularConfigurer.setBaseUrl('https://metaheuristic.fr/podcast-api/v1/');
            //RestangularConfigurer.setBaseUrl('http://localhost:8000/podcast-api/v1/');

            RestangularConfigurer.configuration.requestSuffix = '/';

            // add a response interceptor

            RestangularConfigurer.addResponseInterceptor((response, operation, what, url) => {

                let newResponse = null;

                if (operation === "getList") {

                    newResponse = response.objects;

                } else {

                    newResponse = response;

                }

                return newResponse;

            });

        });



    }



}


