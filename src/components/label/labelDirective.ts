import * as angular from 'angular';

/**
 * @ngdoc interface
 * @name ILabelAttributes
 * @module officeuifabric.components.label
 *
 * @description
 * Those are the attributes that can be used on label directive.
 *
 *
 * @property {string} disabled - If set, renders disabled label.
 * @property {string} required - If set, renders required label.
 */
interface ILabelAttributes extends angular.IAttributes {
  disabled: string;
  required: string;
}

/**
 * @ngdoc directive
 * @name uifLabel
 * @module officeuifabric.components.label
 *
 * @restrict E
 *
 * @description
 * `<uif-label>` is and directive for rendering label component.
 * @see https://github.com/OfficeDev/Office-UI-Fabric/tree/master/src/components/Label
 *
 * @usage
 *
 * <uif-label>Name</uif-label>
 */
export class LabelDirective implements angular.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = false;
  public scope: {} = {
    ngRequired: '<?'
  };
  public template: string = '<label class="ms-Label"><ng-transclude/></label>';

  public static factory(): angular.IDirectiveFactory {
    const directive: angular.IDirectiveFactory = () => new LabelDirective();
    return directive;
  }

  public link(scope: angular.IScope, instanceElement: angular.IAugmentedJQuery, attributes: ILabelAttributes): void {
    let label: JQuery = instanceElement.find('label').eq(0);

    if (angular.isDefined(attributes.disabled)) {
      label.addClass('is-disabled');
    }

    if (angular.isDefined(attributes.required)) {
      label.addClass('is-required');
    }

    // add ng-required watcher
    scope.$watch('ngRequired', (newValue: string, oldValue: string) => {
      if (newValue) {
        label.addClass('is-required');
      } else if (newValue !== undefined && !newValue) {
        label.removeClass('is-required');
      }
    });
  }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.label
 *
 * @description
 * Label
 */
export let module: angular.IModule = angular.module('officeuifabric.components.label', ['officeuifabric.components'])
  .directive('uifLabel', LabelDirective.factory());
