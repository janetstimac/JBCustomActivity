module.exports = function configJSON(req) {
  return {
    workflowApiVersion: '1.1',
    metaData: {
      // the location of our icon file
      icon: `https://image.s4.sfmc-content.com/lib/fe9115747361007577/m/1/426356d0-4996-4ae1-917a-329692240cc4.jpg`,
      category: 'customer'
    },
    // For Custom Activity this must say, "REST"
    type: 'REST',
    lang: {
      'en-US': {
        name: 'Discount Code',
        description: 'Issue a discount code to contact them to entice them to buy something.'
      }
    },
    arguments: {
      execute: {
        // See: https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/how-data-binding-works.htm
        inArguments: [
          {
            discount: 10
          }
        ],
        outArguments: [],
        // Fill in the host with the host that this is running on.
        // It must run under HTTPS
        
        url: `https://jbcustomactivity.herokuapp.com/modules/discount-code/index.html`,
        // The amount of time we want Journey Builder to wait before cancel the request. Default is 60000, Minimal is 1000
        timeout: 10000,
        // how many retrys if the request failed with 5xx error or network error. default is 0
        retryCount: 3,
        // wait in ms between retry.
        retryDelay: 1000,
        // The number of concurrent requests Journey Builder will send all together
        concurrentRequests: 5
      }
    },
    configurationArguments: {
      publish: {
        url: `https://jbcustomactivity.herokuapp.com/publish`
      },
      validate: {
        url: `https://jbcustomactivity.herokuapp.com/validate`
      },
      stop: {
        url: `https://jbcustomactivity.herokuapp.com/stop`
      }
    },
    userInterfaces: {
      configurationSupportsReadOnlyMode : true,
      configInspector: {
        size: 'scm-lg',
        emptyIframe: true
      }
    },
    schema: {
      arguments: {
        execute: {
          inArguments: [],
          outArguments: [{
            discountCode: {
              dataType: 'Text',
              direction: 'out',
              access: 'visible'
            },
            discount: {
              dataType: 'Number',
              direction: 'out',
              access: 'visible'
            }
          }]
        }
      }
    }
  };
};
